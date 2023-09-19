use std::sync::Arc;

use anyhow::anyhow;
use domain::{blockchain::evm, Amount, Currency, Iban, PaymentReceipt, PaymentReceiptId};
use http_api_problem::HttpApiProblem;
use presentation::http::guards::ApiKey;
use reqwest::StatusCode;
use rocket::{serde::json::Json, State};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application, infrastructure::web3::ens, presentation::http};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub receipt_id: PaymentReceiptId,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	amount: Decimal,
	currency: &'static Currency,
	recipient_wallet: Option<String>,
	recipient_iban: Option<Iban>,
	transaction_reference: String,
}

#[post(
	"/payments/<payment_id>/receipts",
	data = "<request>",
	format = "application/json"
)]
pub async fn create(
	_api_key: ApiKey,
	payment_id: Uuid,
	request: Json<Request>,
	ens: &State<Arc<ens::Client>>,
	process_payment_usecase: application::payment::process::Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let Request {
		amount,
		currency,
		recipient_wallet,
		recipient_iban,
		transaction_reference,
	} = request.into_inner();

	let amount = Amount::from_decimal(amount, currency);

	let receipt =
		build_payment_receipt(ens, recipient_wallet, recipient_iban, transaction_reference)
			.await
			.map_err(|e| {
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title("Bad request")
					.detail(e.to_string())
			})?;

	let receipt_id = process_payment_usecase
		.add_payment_receipt(payment_id.into(), amount, receipt)
		.await
		.map_err(http::error::Error::from)?;

	Ok(Json(Response { receipt_id }))
}

async fn build_payment_receipt(
	ens: &ens::Client,
	recipient_wallet: Option<String>,
	recipient_iban: Option<Iban>,
	transaction_reference: String,
) -> anyhow::Result<PaymentReceipt> {
	match (recipient_iban, recipient_wallet) {
		(Some(recipient_iban), None) => Ok(PaymentReceipt::Sepa {
			recipient_iban,
			transaction_reference,
		}),
		(None, Some(wallet)) => {
			let (recipient_address, recipient_ens) = if wallet.starts_with("0x") {
				(wallet.parse()?, None)
			} else {
				let address = ens.eth_address(&wallet).await?;
				(address, Some(evm::Name::new(wallet)))
			};

			Ok(PaymentReceipt::Ethereum {
				recipient_address,
				recipient_ens,
				transaction_hash: transaction_reference,
			})
		},
		(Some(_), Some(_)) => Err(anyhow!(
			"You cannot specify both the recipient iban and wallet"
		)),
		(None, None) => Err(anyhow!(
			"You must provide at least the recipient iban or wallet"
		)),
	}
}
