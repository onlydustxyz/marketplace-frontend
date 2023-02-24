use anyhow::anyhow;
use domain::{Amount, BlockchainNetwork, Currency, PaymentReceipt, ProjectId, UserId};
use iban::Iban;
use juniper::{graphql_object, DefaultScalarValue};
use rusty_money::Money;
use uuid::Uuid;

use super::{Context, Error, Result};
use crate::{
	domain::{
		user_info::{Email, Identity, Location, PayoutSettings},
		PaymentReason,
	},
	presentation::http::dto::{EthereumIdentityInput, IdentityInput, PayoutSettingsInput},
};

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn add_eth_payment_receipt(
		context: &Context,
		project_id: Uuid,
		payment_id: Uuid,
		amount: String,
		currency_code: String,
		recipient_identity: EthereumIdentityInput,
		transaction_hash: String,
	) -> Result<Uuid> {
		let currency = rusty_money::crypto::find(&currency_code).ok_or_else(|| {
			Error::InvalidRequest(anyhow!("Unknown currency code: {currency_code}"))
		})?;

		let amount = Money::from_str(&amount, currency)
			.map_err(|e| Error::InvalidRequest(anyhow::Error::msg(e)))?;

		let eth_identity = recipient_identity.try_into().map_err(Error::InvalidRequest)?;
		let ethereum_address = match eth_identity {
			domain::EthereumIdentity::Address(addr) => addr,
			domain::EthereumIdentity::Name(name) => context.ens.eth_address(name.as_str()).await?,
		};

		let receipt_id = context
			.process_payment_usecase
			.add_payment_receipt(
				&project_id.into(),
				&payment_id.into(),
				Amount::new(*amount.amount(), Currency::Crypto(currency_code)),
				PaymentReceipt::OnChainPayment {
					network: BlockchainNetwork::Ethereum,
					recipient_address: ethereum_address,
					transaction_hash,
				},
			)
			.await?;

		Ok(receipt_id.into())
	}

	pub async fn add_fiat_payment_receipt(
		context: &Context,
		project_id: Uuid,
		payment_id: Uuid,
		amount: String,
		currency_code: String,
		recipient_iban: String,
		transaction_reference: String,
	) -> Result<Uuid> {
		let currency = rusty_money::iso::find(&currency_code).ok_or_else(|| {
			Error::InvalidRequest(anyhow!("Unknown currency code: {currency_code}"))
		})?;

		let amount = Money::from_str(&amount, currency)
			.map_err(|e| Error::InvalidRequest(anyhow::Error::msg(e)))?;

		let recipient_iban =
			recipient_iban.parse::<Iban>().map_err(|e| Error::InvalidRequest(e.into()))?;

		let receipt_id = context
			.process_payment_usecase
			.add_payment_receipt(
				&project_id.into(),
				&payment_id.into(),
				Amount::new(*amount.amount(), Currency::Crypto(currency_code)),
				PaymentReceipt::FiatPayment {
					recipient_iban,
					transaction_reference,
				},
			)
			.await?;

		Ok(receipt_id.into())
	}

	pub async fn cancel_payment_request(
		context: &Context,
		project_id: Uuid,
		payment_id: Uuid,
	) -> Result<Uuid> {
		context
			.cancel_payment_usecase
			.cancel(&project_id.into(), &payment_id.into())
			.await?;
		Ok(payment_id)
	}

	pub async fn create_project(
		context: &Context,
		name: String,
		short_description: String,
		long_description: String,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<Uuid> {
		let project_id = context
			.create_project_usecase
			.create(
				name.try_into()?,
				short_description.try_into()?,
				long_description.try_into()?,
				telegram_link,
				logo_url,
			)
			.await?;

		Ok(project_id.into())
	}

	pub async fn update_project(
		context: &Context,
		id: Uuid,
		name: String,
		short_description: String,
		long_description: String,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<Uuid> {
		context
			.update_project_usecase
			.update_details(
				id.into(),
				name.try_into()?,
				short_description.try_into()?,
				long_description.try_into()?,
				telegram_link,
				logo_url,
			)
			.await?;

		Ok(id)
	}

	pub async fn update_budget_allocation(
		context: &Context,
		project_id: Uuid,
		new_remaining_amount_in_usd: i32,
	) -> Result<bool> {
		context
			.update_budget_allocation_usecase
			.update_allocation(
				&project_id.into(),
				&Money::from_major(
					new_remaining_amount_in_usd as i64,
					rusty_money::crypto::USDC,
				)
				.into(),
			)
			.await?;

		Ok(true)
	}

	pub async fn link_github_repo(
		context: &Context,
		project_id: Uuid,
		github_repo_id: i32,
	) -> Result<Uuid> {
		context
			.link_github_repo_usecase
			.link_github_repo(project_id.into(), (github_repo_id as i64).into())
			.await?;

		Ok(project_id)
	}

	pub async fn unlink_github_repo(
		context: &Context,
		project_id: Uuid,
		github_repo_id: i32,
	) -> Result<Uuid> {
		context
			.unlink_github_repo_usecase
			.unlink_github_repo(project_id.into(), (github_repo_id as i64).into())
			.await?;

		Ok(project_id)
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

		reason.is_valid().map_err(|e| Error::InvalidRequest(e.into()))?;

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
		location: Option<Location>,
		identity: Option<IdentityInput>,
		email: Option<Email>,
		payout_settings: Option<PayoutSettingsInput>,
	) -> Result<Uuid> {
		let caller_id = *context.caller_info()?.user_id();

		let identity = match identity {
			Some(identity_value) =>
				Some(Identity::try_from(identity_value).map_err(Error::InvalidRequest)?),
			None => None,
		};

		let payout_settings = match payout_settings {
			Some(payout_settings_value) => Some(
				PayoutSettings::try_from(payout_settings_value).map_err(Error::InvalidRequest)?,
			),
			None => None,
		};

		context
			.update_user_info_usecase
			.update_profile_info(caller_id, identity, location, email, payout_settings)
			.await?;

		Ok(caller_id.into())
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

	pub fn add_sponsor_to_project(
		context: &Context,
		project_id: Uuid,
		sponsor_id: Uuid,
	) -> Result<Uuid> {
		context
			.add_sponsor_usecase
			.add_sponsor(&project_id.into(), &sponsor_id.into())?;

		Ok(project_id)
	}

	pub fn remove_sponsor_from_project(
		context: &Context,
		project_id: Uuid,
		sponsor_id: Uuid,
	) -> Result<Uuid> {
		context
			.remove_sponsor_usecase
			.remove_sponsor(&project_id.into(), &sponsor_id.into())?;

		Ok(project_id)
	}
}
