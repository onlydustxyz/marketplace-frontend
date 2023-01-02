const fs = require("fs");
const csv = require("csv");
const nconf = require("nconf");

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_ADMIN_SECRET = process.env.GRAPHQL_ADMIN_SECRET;

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const graphqlAsAdmin = async (query, variables = undefined) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Hasura-Admin-Secret": GRAPHQL_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  }).then(response => response.json());

  if (response.errors) {
    throw response.errors;
  }

  return response.data;
};

const graphqlAsUser = async (userId, query, variables = undefined) => {
  const user = await getProjectLeadInfos(userId);
  const projects = JSON.stringify(user.projectsLeaded.map(p => p.projectId))
    .replace("{", "[")
    .replace("}", "]");

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Hasura-Admin-Secret": GRAPHQL_ADMIN_SECRET,
      "X-Hasura-role": "registered_user",
      "X-Hasura-user-id": userId,
      "x-hasura-projectsLeaded": projects,
    },
    body: JSON.stringify({ query, variables }),
  }).then(response => response.json());

  if (response.errors) {
    throw response.errors;
  }

  return response.data;
};

const getProjectLeadInfos = async userId =>
  graphqlAsAdmin(
    `query($userId: uuid!){
        user(id:$userId) {
          projectsLeaded {
            projectId
          }
        }
      }`,
    { userId }
  ).then(response => response.user);

const getProjectDetails = async projectName =>
  graphqlAsAdmin(
    `query ($projectName: String!) {
        projects(where: {name: {_eq: $projectName}}) {
          id
          projectLeads {
            userId
          }
          budgets {
            id
          }
        }
      }`,
    { projectName }
  ).then(response => {
    if (response.projects.length == 0) {
      throw new Error(`Project '${projectName}' not found`);
    }

    if (response.projects.length > 1) {
      throw new Error(`More than one project named '${projectName}'`);
    }
    return response.projects[0];
  });

const getGithubUser = async githubLogin =>
  graphqlAsAdmin(
    `query($githubLogin: String!) {
    fetchUserDetails(username: $githubLogin) {
      id
    }
  }`,
    { githubLogin }
  ).then(response => response.fetchUserDetails);

const sendPaymentRequest = async (leaderId, amountInUsd, budgetId, recipientId, workItems) =>
  nconf.get("simulate")
    ? "fake_payment_id"
    : graphqlAsUser(
        leaderId,
        `mutation ($amountInUsd:Int!, $budgetId: Uuid!, $recipientId:Int!, $reason:Reason!) {
    requestPayment(amountInUsd: $amountInUsd, budgetId: $budgetId, recipientId: $recipientId, reason: $reason)
}`,
        {
          amountInUsd,
          budgetId,
          recipientId,
          reason: { workItems },
        }
      ).then(response => response.requestPayment);

const addEthReceipt = async (amount, currencyCode, paymentId, recipientAddress, transactionHash) =>
  nconf.get("simulate")
    ? "fake_receipt_id"
    : graphqlAsAdmin(
        `mutation($amount:String!, $currencyCode:String!, $paymentId:Uuid!, $recipientAddress:EthereumAddress!, $transactionHash:String!) {
    addEthPaymentReceipt(amount: $amount, currencyCode: $currencyCode, paymentId: $paymentId, recipientAddress: $recipientAddress, transactionHash: $transactionHash)
  }`,
        {
          amount,
          currencyCode,
          paymentId,
          recipientAddress,
          transactionHash,
        }
      ).then(response => response.addEthPaymentReceipt);

const importPayment = async (
  projectName,
  recipientGithubHandle,
  recipientEthAddress,
  workItems,
  amount,
  transactionHash
) => {
  console.error(`Processing payment for ${recipientGithubHandle} (${amount} $)`);
  const project = await getProjectDetails(projectName);
  const githubUser = await getGithubUser(recipientGithubHandle);

  const projectId = project.id;
  const leaderId = project.projectLeads[0].userId;
  const budgetId = project.budgets[0].id;
  const recipientGithubId = githubUser.id;

  const paymentId = await sendPaymentRequest(leaderId, amount, budgetId, recipientGithubId, workItems);
  await sleep(500);
  const receiptId = await addEthReceipt(amount.toString(), "USDC", paymentId, recipientEthAddress, transactionHash);

  return {
    projectId,
    budgetId,
    paymentId,
    receiptId,
    requestorId: leaderId,
    recipientId: recipientGithubId,
    amount,
    currency: "USDC",
    workItems: JSON.stringify(workItems),
    transactionHash,
  };
};

const importPaymentsFromFile = async (projectName, filename) => {
  let reports = [];

  for await (const record of fs.createReadStream(filename, "utf-8").pipe(csv.parse({ columns: true, trim: true }))) {
    try {
      const amount = parseInt(record["Est. Reward ($)"]);
      if (!isNaN(amount)) {
        const report = await importPayment(
          projectName,
          record["Github Handle"],
          record["Ethereum Address"],
          record["PR links"].split(";").map(item => item.trim()),
          amount,
          record["Transaction Hash of Payment"]
        );
        reports.push(report);
      }
    } catch (error) {
      console.error(error);
    }
  }

  csv.stringify(reports).pipe(process.stdout);
};

nconf.argv(
  require("yargs")
    .version("1.0.0")
    .usage("Usage: import-payments-history.js -p Kakarot -f kakarot.csv > kakarot_report.csv")
    .strict()
    .options({
      project: {
        alias: "p",
        describe: "The project name to import payments for",
        demand: true,
      },
      filename: {
        alias: "f",
        describe: "The path to the CSV file that contains the list of payments to import",
        demand: true,
      },
      simulate: {
        alias: "s",
        describe: "simulate mutation, do not execute them",
        type: "boolean",
      },
    })
);

importPaymentsFromFile(nconf.get("project"), nconf.get("filename"));
