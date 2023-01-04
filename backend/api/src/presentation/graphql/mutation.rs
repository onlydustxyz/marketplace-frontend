use anyhow::anyhow;
use domain::{
	Amount, BlockchainNetwork, Currency, EthereumAddress, PaymentReceipt, ProjectId, UserId,
};
use juniper::{graphql_object, DefaultScalarValue};
use rusty_money::{crypto, Money};
use uuid::Uuid;

use super::{Context, Error, Result};
use crate::{
	domain::{
		user_info::{Email, Identity, Location, PayoutSettings},
		PaymentReason, ProjectDetails,
	},
	presentation::http::dto::{IdentityInput, PayoutSettingsInput},
};

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn add_eth_payment_receipt(
		context: &Context,
		payment_id: Uuid,
		amount: String,
		currency_code: String,
		recipient_address: EthereumAddress,
		transaction_hash: String,
	) -> Result<Uuid> {
		let currency = crypto::find(&currency_code).ok_or_else(|| {
			Error::InvalidRequest(anyhow!("Unknown currency code: {currency_code}"))
		})?;

		let amount = Money::from_str(&amount, currency)
			.map_err(|e| Error::InvalidRequest(anyhow::Error::msg(e)))?;

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
		github_repo_id: i32,
		description: Option<String>,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<Uuid> {
		let project_id = context
			.create_project_usecase
			.create(
				name,
				Money::from_major(initial_budget_in_usd as i64, crypto::USDC).into(),
				(github_repo_id as i64).into(),
				description,
				telegram_link,
				logo_url,
			)
			.await?;

		Ok(project_id.into())
	}

	pub async fn update_project(
		context: &Context,
		id: Uuid,
		description: Option<String>,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<Uuid> {
		let project_id = id.into();

		context.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			description,
			telegram_link,
			logo_url,
		))?;

		Ok(id)
	}

	pub async fn request_payment(
		context: &Context,
		project_id: Uuid,
		recipient_id: i32,
		amount_in_usd: i32,
		reason: PaymentReason,
	) -> Result<Uuid> {
		let caller_id = *context.caller_info()?.user_id();

		if !context.caller_permissions.can_spend_budget_of_project(&project_id.into()) {
			return Err(Error::NotAuthorized(
				caller_id,
				"Project Lead role required".to_string(),
			));
		}

		let payment_request_id = context
			.request_payment_usecase
			.request(
				project_id.into(),
				caller_id,
				(recipient_id as i64).into(),
				amount_in_usd as u32,
				serde_json::to_value(reason).map_err(|e| Error::InvalidRequest(anyhow!(e)))?,
			)
			.await?;

		Ok(payment_request_id.into())
	}

	pub async fn update_profile_info(
		context: &Context,
		location: Location,
		identity: IdentityInput,
		email: Email,
		payout_settings: PayoutSettingsInput,
	) -> Result<Uuid> {
		let caller_id = *context.caller_info()?.user_id();

		let identity = Identity::try_from(identity).map_err(Error::InvalidRequest)?;
		let payout_settings =
			PayoutSettings::try_from(payout_settings).map_err(Error::InvalidRequest)?;

		context
			.update_user_info_usecase
			.update_profile_info(caller_id, identity, location, email, payout_settings)
			.await?;

		Ok(caller_id.into())
	}

	pub async fn update_project_github_repo_id(
		context: &Context,
		id: Uuid,
		github_repo_id: i32,
	) -> Result<Uuid> {
		context
			.update_project_github_repo_id_usecase
			.update_project_github_repo_id(id.into(), (github_repo_id as i64).into())
			.await?;

		Ok(id)
	}

	pub async fn invite_project_leader(
		context: &Context,
		project_id: Uuid,
		github_user_id: i32,
	) -> Result<Uuid> {
		let invitation_id = context
			.invite_project_leader_usecase
			.invite_leader(project_id.into(), (github_user_id as i64).into())
			.await?;

		Ok(invitation_id.into())
	}

	pub async fn accept_project_leader_invitation(
		context: &Context,
		invitation_id: Uuid,
	) -> Result<bool> {
		let caller_info = context.caller_info()?;
		context
			.accept_project_leader_invitation_usecase
			.accept_leader_invitation(
				&invitation_id.into(),
				caller_info.user_id(),
				caller_info.github_user_id(),
			)
			.await?;

		Ok(true)
	}

	pub async fn unassign_project_lead(
		context: &Context,
		project_id: Uuid,
		user_id: Uuid,
	) -> Result<bool> {
		let project_id = ProjectId::from(project_id);
		let caller_id = UserId::from(user_id);

		if !context.caller_permissions.can_unassign_project_leader(&project_id, &caller_id) {
			return Err(Error::NotAuthorized(
				caller_id,
				"Only an admin can unasign an project lead".to_string(),
			));
		}

		context
			.remove_project_leader_usecase
			.remove_leader(&project_id, &caller_id)
			.await?;

		Ok(true)
	}
}
