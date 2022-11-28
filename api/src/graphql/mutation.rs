use super::Context;
use anyhow::anyhow;
use domain::{Amount, BlockchainNetwork, Currency, PaymentReceipt};
use juniper::{graphql_object, graphql_value, DefaultScalarValue, FieldError, IntoFieldError};
use rusty_money::{crypto, Money};
use thiserror::Error;
use uuid::Uuid;

#[derive(Debug, Error)]
enum Error {
	#[error("User is not authorized to perform the action")]
	NotAuthorized(String),
	#[error("Invalid GraphQL request")]
	InvalidRequest(#[from] anyhow::Error),
}

impl IntoFieldError for Error {
	fn into_field_error(self) -> FieldError<DefaultScalarValue> {
		let (msg, reason) = match &self {
			Self::NotAuthorized(reason) => (self.to_string(), reason.clone()),
			Self::InvalidRequest(source) => (self.to_string(), source.to_string()),
		};
		FieldError::new(msg, graphql_value!({ "reason": reason }))
	}
}

type Result<T> = std::result::Result<T, Error>;

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn add_eth_payment_receipt(
		context: &Context,
		payment_id: Uuid,
		amount: String,
		currency_code: String,
		recipient_address: String,
		transaction_hash: String,
	) -> Result<Uuid> {
		let currency = crypto::find(&currency_code)
			.ok_or_else(|| anyhow!("Unknown currency code: {currency_code}"))?;
		let amount = Money::from_str(&amount, currency).map_err(anyhow::Error::msg)?;

		let payment_id = context
			.process_payment_usecase
			.add_receipt(
				payment_id.into(),
				Amount::new(*amount.amount(), Currency::Crypto(currency_code)),
				PaymentReceipt::OnChainPayment {
					network: BlockchainNetwork::Ethereum,
					recipient_address,
					transaction_hash,
				},
			)
			.await?;

		Ok(payment_id.into())
	}

	pub async fn create_project(
		context: &Context,
		name: String,
		initial_budget_in_usd: i32,
	) -> Result<Uuid> {
		let project_id = context
			.create_project_usecase
			.create(
				name,
				Money::from_major(initial_budget_in_usd as i64, crypto::USDC).into(),
			)
			.await?;

		Ok(project_id.into())
	}

	pub async fn assign_project_lead(
		context: &Context,
		project_id: Uuid,
		leader_id: Uuid,
	) -> Result<Uuid> {
		context
			.assign_project_lead_usecase
			.assign_leader(project_id.into(), leader_id.into())
			.await?;

		Ok(project_id)
	}

	pub async fn request_payment(
		context: &Context,
		project_id: Uuid,
		requestor_id: Uuid,
		recipient_id: Uuid,
		amount_in_usd: i32,
		reason: String,
	) -> Result<Uuid> {
		if !context.user.is_leader_on_project(&project_id.into()) {
			return Err(Error::NotAuthorized(
				"Project leader role required".to_string(),
			));
		}

		let payment_request_id = context
			.request_payment_usecase
			.request(
				project_id.into(),
				requestor_id.into(),
				recipient_id.into(),
				amount_in_usd as u32,
				reason.into(),
			)
			.await?;

		Ok(payment_request_id.into())
	}
}
