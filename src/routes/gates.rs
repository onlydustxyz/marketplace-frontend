use deathnote_contributions_feeder::{
    database::{self, connections::pg_connection::DbConn, models::NewContributionGate},
    starknet::{make_account_from_env, oracle_contract_address, ContractAdministrator},
};
use rocket::{post, response::status, serde::json::Json};
use serde::Deserialize;
use starknet::core::types::FieldElement;

use crate::routes::Failure;

use deathnote_contributions_feeder::domain::*;

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Body {
    gate_id: String,
}

#[post(
    "/contribution/<contribution_id>/gate",
    format = "application/json",
    data = "<body>"
)]
pub async fn add_gate(
    body: Json<Body>,
    contribution_id: String,
    connection: DbConn,
) -> Result<status::Accepted<String>, Failure> {
    let account = make_account_from_env();
    let address = oracle_contract_address();

    let gated_contribution_administrator = ContractAdministrator::new(&account, address);
    let transaction_hash = gated_contribution_administrator
        .add_gate_to_contribution(
            contribution_id.clone(),
            FieldElement::from_hex_be(&body.gate_id)
                .map_err(|e| Failure::InternalServerError(e.to_string()))?,
        )
        .await
        .map_err(|e| Failure::InternalServerError(e.to_string()))?;

    let database = database::API::new(connection);

    database
        .insert_gate(NewContributionGate {
            contribution_id,
            gate_id: body.gate_id.clone(),
            transaction_hash: transaction_hash.clone(),
        })
        .map_err(|e| Failure::InternalServerError(e.to_string()))?;

    Ok(status::Accepted(Some(transaction_hash)))
}
