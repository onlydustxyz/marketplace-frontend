use diesel::{sql_query, Connection, PgConnection, RunQueryDsl};
use rstest::*;

use super::Config;

#[fixture]
#[once]
fn config() -> Config {
	Config::new(
		"postgres://postgres:postgres@localhost/marketplace_db".to_string(),
		20,
	)
}

#[fixture]
fn connection(config: &Config) -> PgConnection {
	PgConnection::establish(config.url()).unwrap()
}

#[rstest]
#[case(
	"
SELECT auth.users.id, information.CompanyNum, information.CompanyName, information.firstname,
information.lastname, information.number, information.street, information.post_code,
information.city, information.country, information.BIC, information.IBAN, information.name,
information.address, display_name, users.created_at, users.updated_at, last_seen, avatar_url,
email, phone_number, provider_user_id FROM auth.users
INNER JOIN auth.user_providers ON auth.users.id = auth.user_providers.user_id
LEFT OUTER JOIN (
    SELECT user_id, identity->'Company'->>'id' as CompanyNum, identity->'Company'->>'name' as
CompanyName, identity->'Person'->>'firstname' as firstname, identity->'Person'->>'lastname' as
lastname, location->'city' as city, location->'number' as number, location->'street' as street,
location->'post_code' as post_code, location->'country' as country,
payout_settings->'WireTransfer'->>'BIC' as BIC, payout_settings->'WireTransfer'->>'IBAN' as IBAN,
payout_settings->'EthTransfer'->>'Name' as name, payout_settings->'EthTransfer'->>'Address' as
address     FROM user_payout_info
) information ON (auth.users.id = information.user_id);
"
)]
#[case(
	"
SELECT projects.id, project_details.name, project_details.short_description,
project_details.long_description, telegram_link, logo_url, user_id, initial_amount,
remaining_amount, created.timestamp FROM projects
LEFT OUTER JOIN project_details ON projects.id = project_details.project_id
LEFT OUTER JOIN project_leads ON projects.id = project_leads.project_id
LEFT OUTER JOIN budgets ON projects.id = budgets.project_id
LEFT OUTER JOIN (
  SELECT payload->'Created'->>'id' as id, \"timestamp\"
  FROM events
  WHERE aggregate_name = 'PROJECT' AND payload->'Created' IS NOT NULL
) created ON (projects.id::TEXT = created.id);
"
)]
#[case(
	"
SELECT github_repos.id as github_repo_id, github_repos.owner as github_repo_owner,
github_repos.name as github_repo_name, github_repos.languages as
github_repo_languages, project_github_repos.project_id
FROM github_repos
INNER JOIN project_github_repos ON project_github_repos.github_repo_id = github_repos.id;
"
)]
#[case("
SELECT payment_requests.id, project_id, budgets.id as budget_id, amount_in_usd, recipient_id,
requestor_id, Items.items AS PRs, requested.timestamp as Requested, processed.timestamp as
Processed FROM payment_requests
INNER JOIN budgets ON payment_requests.budget_id = budgets.id
LEFT OUTER JOIN (
	SELECT string_agg('https://github.com/'||r.owner||'/'||r.name||'/issues/'||issue_number, ', ') AS Items, payment_id
	FROM work_items
	INNER JOIN github_repos AS r ON id = work_items.repo_id
	GROUP BY payment_id
) Items ON (payment_requests.id = Items.payment_id)
INNER JOIN (
  SELECT payload->'Budget'->'event'->'Payment'->'event'->'Requested'->>'id' as id, \"timestamp\"
  FROM events
  WHERE aggregate_name = 'PROJECT' AND payload->'Budget'->'event'->'Payment'->'event'?'Requested'
) requested ON (payment_requests.id::TEXT = requested.id)
LEFT OUTER JOIN (
  SELECT payload->'Budget'->'event'->'Payment'->'event'->'Processed'->>'id' as id, \"timestamp\"
  FROM events
  WHERE aggregate_name = 'PROJECT' AND payload->'Budget'->'event'->'Payment'->'event'?'Processed'
) processed ON (payment_requests.id::TEXT = processed.id);
")]
#[case(
	"
SELECT id, project_id, github_user_id
FROM pending_project_leader_invitations;
"
)]
async fn crm_select(#[case] query: &str, connection: PgConnection) {
	let result = sql_query(query).execute(&connection);
	assert!(result.is_ok(), "Error during query execution: {:?}", result);
}
