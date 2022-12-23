const fs = require("fs");
const csv = require("csv");
const nconf = require("nconf");

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_ADMIN_SECRET = process.env.GRAPHQL_ADMIN_SECRET;

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
  const budgets = JSON.stringify(user.budgetsOwned.map(b => b.budgetId))
    .replace("{", "[")
    .replace("}", "]");

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Hasura-Admin-Secret": GRAPHQL_ADMIN_SECRET,
      "X-Hasura-role": "registered_user",
      "X-Hasura-user-id": userId,
      "x-hasura-projectsLeaded": projects,
      "x-hasura-budgetsOwned": budgets,
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
          budgetsOwned {
            budgetId
          }
        }
      }`,
    { userId }
  ).then(response => response.user);

const getProjectDetails = async projectId =>
  graphqlAsAdmin(
    `query($projectId: uuid!) {
    projectsByPk(id: $projectId) {
        id
        projectLeads {
            userId
        }
        budgets {
            id
        }
    }
  }`,
    { projectId }
  ).then(response => response.projectsByPk);

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
  graphqlAsUser(
    leaderId,
    `mutation ($amountInUsd:Int!, $budgetId: Uuid!, $recipientId:Int!, $reason:String!) {
        requestPayment(amountInUsd: $amountInUsd, budgetId: $budgetId, recipientId: $recipientId, reason: $reason)
    }`,
    {
      amountInUsd,
      budgetId,
      recipientId,
      reason: JSON.stringify({ workItems }),
    }
  ).then(response => response.requestPayment);

const addEthReceipt = async (amount, currencyCode, paymentId, recipientAddress, transactionHash) =>
  graphqlAsAdmin(
    `mutation($amount:String!, $currencyCode:String!, $paymentId:Uuid!, $recipientAddress:String!, $transactionHash:String!) {
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
  projectId,
  recipientGithubHandle,
  recipientEthAddress,
  workItems,
  amount,
  transactionHash
) => {
  console.error(`Processing payment for ${recipientGithubHandle} (${amount} $)`);
  const project = await getProjectDetails(projectId);
  const githubUser = await getGithubUser(recipientGithubHandle);

  const leaderId = project.projectLeads[0].userId;
  const budgetId = project.budgets[0].id;
  const recipientGithubId = githubUser.id;

  const paymentId = await sendPaymentRequest(leaderId, amount, budgetId, recipientGithubId, workItems);
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

const importPaymentsFromFile = async (projectId, filename) => {
  let reports = [];

  for await (const record of fs.createReadStream(filename, "utf-8").pipe(csv.parse({ columns: true, trim: true }))) {
    try {
      const amount = parseInt(record["Est. Reward ($)"]);
      if (!isNaN(amount)) {
        const report = await importPayment(
          projectId,
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
    .usage("Usage: import-payments-history.js -p project_id -f file.csv > report.csv")
    .strict()
    .options({
      project: {
        alias: "p",
        describe: "The project ID to import payments for",
        demand: true,
      },
    })
    .options({
      filename: {
        alias: "f",
        describe: "The path to the CSV file that contains the list of payments to import",
        demand: true,
      },
    })
);

importPaymentsFromFile(nconf.get("project"), nconf.get("filename"));
