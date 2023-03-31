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
async fn crm_select(connection: PgConnection) {
	let result= sql_query("
		SELECT auth.users.id, information.CompanyNum, information.CompanyName, information.firstname, information.lastname, information.number, information.street, information.post_code, information.city, information.country, information.BIC, information.IBAN, information.name, information.address, display_name, users.created_at, users.updated_at, last_seen, avatar_url, email, phone_number, provider_user_id
		FROM auth.users
		INNER JOIN auth.user_providers ON auth.users.id = auth.user_providers.user_id
		LEFT OUTER JOIN (
			SELECT user_id, identity->'Company'->>'id' as CompanyNum, identity->'Company'->>'name' as CompanyName, identity->'Person'->>'firstname' as firstname, identity->'Person'->>'lastname' as lastname, location->'city' as city, location->'number' as number, location->'street' as street, location->'post_code' as post_code, location->'country' as country, payout_settings->'WireTransfer'->>'BIC' as BIC, payout_settings->'WireTransfer'->>'IBAN' as IBAN, payout_settings->'EthTransfer'->>'Name' as name, payout_settings->'EthTransfer'->>'Address' as address
			FROM user_info
		) information ON (auth.users.id = information.user_id);
	").execute(&connection);
	assert!(result.is_ok(), "Error during query execution: {:?}", result);
}
