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
	SELECT auth.users.id, information.CompanyName, information.CompanyNum, information.CompanyFirstname, information.CompanyLastname, information.PersonFirstname, information.PersonLastname, information.address, information.post_code, information.city, information.country, information.telegram, information.twitter, information.discord, information.linkedin, information.BIC, information.IBAN, information.ENSdomain, information.ETHaddress, auth.users.created_at, auth.users.updated_at, auth.users.last_seen, auth.users.email, auth.users.phone_number, provider_user_id, information.login, information.GithubProfileURL, information.avatar_url, information.bio, information.location, information.website, information.looking_for_a_job, information.weekly_allocated_time, information.languages, information.TCAcceptanceDate
	FROM auth.users
	INNER JOIN auth.user_providers ON auth.users.id = auth.user_providers.user_id
	LEFT OUTER JOIN (
		SELECT up.user_id, identity->'Company'->>'name' as CompanyName, identity->'Company'->>'identification_number' as CompanyNum, identity->'Company'->'owner'->>'firstname' as CompanyFirstname, identity->'Company'->'owner'->>'lastname' as CompanyLastname, identity->'Person'->>'firstname' as PersonFirstname, identity->'Person'->>'lastname' as PersonLastname, upi.location->'address' as address, upi.location->'post_code' as post_code, upi.location->'city' as city, upi.location->'country' as country, emails.contact as email, telegram.contact as telegram, twitter.contact as twitter, discord.contact as discord, linkedin.contact as linkedin, payout_settings->'WireTransfer'->>'BIC' as BIC, payout_settings->'WireTransfer'->>'IBAN' as IBAN, payout_settings->'EthTransfer'->>'Name' as ENSdomain, payout_settings->'EthTransfer'->>'Address' as ETHaddress, up.login, up.html_url as GithubProfileURL, up.avatar_url, up.bio, up.location, up.website, up.looking_for_a_job, up.weekly_allocated_time, languages.l as languages, onboardings.terms_and_conditions_acceptance_date as TCAcceptanceDate, onboardings.profile_wizard_display_date as OnboardingCompletionDate
		FROM user_payout_info upi
		LEFT JOIN api.user_profiles up on up.user_id=upi.user_id
		LEFT JOIN LATERAL (
			SELECT
				array_agg(KEY) as l
			FROM (
				SELECT
					github_user_id,
					jsonb_object_keys(languages) AS KEY,
					(languages -> jsonb_object_keys(languages))::int AS value
				FROM
					api.user_profiles
				WHERE
					github_user_id = up.github_user_id
				ORDER BY
					value DESC) AS derived_table
		) languages ON 1=1
		LEFT OUTER JOIN api.contact_informations emails on emails.github_user_id=up.github_user_id and emails.channel='email'
		LEFT OUTER JOIN api.contact_informations telegram on telegram.github_user_id=up.github_user_id and telegram.channel='telegram'
		LEFT OUTER JOIN api.contact_informations twitter on twitter.github_user_id=up.github_user_id and twitter.channel='twitter'
		LEFT OUTER JOIN api.contact_informations discord on discord.github_user_id=up.github_user_id and discord.channel='discord'
		LEFT OUTER JOIN api.contact_informations linkedin on linkedin.github_user_id=up.github_user_id and linkedin.channel='linkedin'
		LEFT OUTER JOIN public.onboardings on onboardings.user_id = upi.user_id
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
fn crm_select(#[case] query: &str, mut connection: PgConnection) {
	let result = sql_query(query).execute(&mut connection);
	assert!(result.is_ok(), "Error during query execution: {:?}", result);
}
