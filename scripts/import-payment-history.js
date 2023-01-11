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

  if (response.error || response.errors) {
    throw response.error || response.errors;
  }

  return response.data;
};

const graphqlAsUser = async (user, query, variables = undefined) => {
  const userInfos = await getProjectLeadInfos(user.id);
  const projects = JSON.stringify(userInfos.projectsLeaded.map(p => p.projectId))
    .replace("{", "[")
    .replace("}", "]");

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Hasura-Admin-Secret": GRAPHQL_ADMIN_SECRET,
      "X-Hasura-role": "registered_user",
      "X-Hasura-user-id": user.id,
      "X-Hasura-githubUserId": user.githubUserId,
      "x-hasura-projectsLeaded": projects,
    },
    body: JSON.stringify({ query, variables }),
  }).then(response => response.json());

  if (response.error || response.errors) {
    throw response.error || response.errors;
  }

  return await response.data;
};

const getProjectIdFromGithubRepo = async (owner, name) =>
  graphqlAsAdmin(
    `query($owner: String!, $name: String!) {
    projects(where: {githubRepo: {owner: {_eq: $owner}, name: {_eq: $name}}}) {
      id
    }
  }
  `,
    { owner, name }
  ).then(response => response.projects?.at(0));

const findProjectIdFromContributionLink = async contributionLink => {
  const re = new RegExp("github.com/(?<owner>[^/]+)/(?<name>[^/]+)");
  const match = contributionLink.match(re);

  const owner = match?.groups?.owner;
  const name = match?.groups?.name;

  if (!owner || !name) {
    throw "Could not determine github repository form contribution link";
  }

  return getProjectIdFromGithubRepo(owner, name);
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

const getProjectDetails = async projectId =>
  graphqlAsAdmin(
    `query ($projectId: uuid!) {
        projectsByPk(id: $projectId) {
          id
          projectLeads {
            userId
            user {
              githubUser {
                githubUserId
              }
            }
          }
        }
      }`,
    { projectId }
  ).then(response => {
    return response.projectsByPk;
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

const sendPaymentRequest = async (projectId, leader, amountInUsd, recipientId, workItems) =>
  nconf.get("simulate")
    ? "fake_payment_id"
    : graphqlAsUser(
        leader,
        `mutation ($projectId: Uuid!, $amountInUsd:Int!, $recipientId:Int!, $reason:Reason!) {
    requestPayment(amountInUsd: $amountInUsd, projectId: $projectId, recipientId: $recipientId, reason: $reason)
}`,
        {
          projectId,
          amountInUsd,
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

const importPaymentRequest = async (projectId, recipientGithubHandle, workItems, amount) => {
  console.error(`[${projectId}] Processing payment for ${recipientGithubHandle} (${amount} $)`);
  const project = await getProjectDetails(projectId);

  if (!recipientGithubHandle?.length) {
    throw "Missing github user name";
  }
  const githubUser = await getGithubUser(recipientGithubHandle);
  if (githubUser === null) {
    throw "Invalid github user name";
  }

  if (!project.projectLeads?.length) {
    throw "Project has no lead";
  }

  const leader = {
    id: project.projectLeads[0].userId,
    githubUserId: project.projectLeads[0].user.githubUser.githubUserId,
  };

  const recipientGithubId = githubUser.id;

  workItems = workItems.filter(item => /^https:\/\/github.com\/[a-zA-Z_\-0-9.\/]+$/.test(item));
  if (workItems.length === 0) {
    throw "No valid contribution link found";
  }

  return await sendPaymentRequest(projectId, leader, amount, recipientGithubId, workItems);
};

const importPaymentReceipt = async (paymentId, recipientEthAddress, amount, transactionHash) => {
  console.error(`Processing payment receipt for ${paymentId} (${amount} $)`);
  return await addEthReceipt(amount.toString(), "USDC", paymentId, recipientEthAddress, transactionHash);
};

const importPaymentsFromFile = async (projectName, filename) => {
  let reports = [];

  for await (const record of fs.createReadStream(filename, "utf-8").pipe(csv.parse({ columns: true, trim: true }))) {
    try {
      if (!["OK", "IGNORE"].includes(record["import_status"])) {
        const amount = parseInt(record["amount"]);
        const ethAddress = record["eth_wallet_address"];
        const transactionHash = record["transaction_hash"];
        const contributionLink = record["contribution_link"];
        const recipientGithubHandle = record["github_username"];
        const isPaymentCompleted = record["status"] === "COMPLETED";

        if (isNaN(amount)) {
          throw "Invalid amount";
        }

        const project = await findProjectIdFromContributionLink(contributionLink);
        if (!project) {
          throw "Could not find project from contribution link";
        }

        if (isPaymentCompleted) {
          if (!/^0x[a-zA-Z0-9]+$/.test(ethAddress)) {
            throw "Invalid ETH address";
          }

          if (!/^0x[a-zA-Z0-9]+$/.test(transactionHash)) {
            throw "Invalid transaction hash";
          }
        }

        const paymentId = await importPaymentRequest(
          project.id,
          recipientGithubHandle,
          contributionLink.split(/[\s,;]+/).map(item => item.trim()),
          amount
        );

        if (isPaymentCompleted) {
          if (!nconf.get("simulate")) {
            await sleep(500);
          }

          await importPaymentReceipt(paymentId, ethAddress, amount, transactionHash);
        }

        record["import_status"] = "OK";
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      record["import_status"] = JSON.stringify(error);
    }
    reports.push(record);
  }

  csv.stringify(reports).pipe(process.stdout);
};

nconf.argv(
  require("yargs")
    .version("1.0.0")
    .usage("Usage: import-payments-history.js -p Kakarot -f kakarot.csv > kakarot_report.csv")
    .strict()
    .options({
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
