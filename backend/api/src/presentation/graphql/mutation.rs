use domain::{blockchain::*, Amount, Iban, PaymentReceipt, ProjectId, ProjectVisibility, UserId};
use juniper::{graphql_object, DefaultScalarValue, Nullable};
use url::Url;
use uuid08::Uuid;

use super::{Context, Error, Result};
use crate::presentation::http::dto::{EthereumIdentityInput, OptionalNonEmptyTrimmedString};

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
		let amount = Amount::from_str(&amount, currency_code.parse()?)
			.map_err(|e| Error::InvalidRequest(anyhow::Error::msg(e)))?;

		let eth_identity = recipient_identity.try_into().map_err(Error::InvalidRequest)?;
		let ethereum_address = match &eth_identity {
			evm::Wallet::Address(addr) => *addr,
			evm::Wallet::Name(name) => context.ens.eth_address(name.as_str()).await?,
		};

		let receipt_id = context
			.process_payment_usecase
			.add_payment_receipt(
				&project_id.into(),
				payment_id.into(),
				Amount::from_decimal(*amount.amount(), currency_code.parse()?),
				PaymentReceipt::OnChainPayment {
					network: Network::Ethereum,
					recipient_address: ethereum_address,
					recipient_ens: match eth_identity {
						evm::Wallet::Name(name) => Some(name),
						_ => None,
					},
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
		recipient_iban: Iban,
		transaction_reference: String,
	) -> Result<Uuid> {
		let currency = currency_code.parse()?;
		let amount = Amount::from_str(&amount, currency)
			.map_err(|e| Error::InvalidRequest(anyhow::Error::msg(e)))?;

		let receipt_id = context
			.process_payment_usecase
			.add_payment_receipt(
				&project_id.into(),
				payment_id.into(),
				Amount::from_decimal(*amount.amount(), currency),
				PaymentReceipt::FiatPayment {
					recipient_iban,
					transaction_reference,
				},
			)
			.await?;

		Ok(receipt_id.into())
	}

	pub async fn mark_invoice_as_received(context: &Context, payments: Vec<Uuid>) -> Result<bool> {
		let caller_id = context.caller_info()?.user_id;
		let payments: Vec<_> = payments.into_iter().map(Into::into).collect();

		if payments.iter().any(|payment_id| {
			!context.caller_permissions.can_mark_invoice_as_received_for_payment(payment_id)
		}) {
			return Err(Error::NotAuthorized(
				caller_id,
				"Only recipient can mark invoice as received".to_string(),
			));
		}

		context.invoice_usecase.mark_invoice_as_received(payments).await?;
		Ok(true)
	}

	pub async fn reject_invoice(context: &Context, payments: Vec<Uuid>) -> Result<bool> {
		let payments: Vec<_> = payments.into_iter().map(Into::into).collect();
		context.invoice_usecase.reject_invoice(payments).await?;
		Ok(true)
	}

	pub async fn update_project(
		context: &Context,
		id: Uuid,
		name: Option<String>,
		short_description: Option<String>,
		long_description: Option<String>,
		telegram_link: Nullable<Url>,
		logo_url: Nullable<Url>,
		hiring: Option<bool>,
		rank: Option<i32>,
		visibility: Option<ProjectVisibility>,
	) -> Result<Uuid> {
		context
			.update_project_usecase
			.update_details(
				id.into(),
				OptionalNonEmptyTrimmedString::try_from(name)?.into(),
				OptionalNonEmptyTrimmedString::try_from(short_description)?.into(),
				OptionalNonEmptyTrimmedString::try_from(long_description)?.into(),
				telegram_link,
				logo_url,
				hiring,
				rank,
				visibility,
			)
			.await?;

		Ok(id)
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

	pub async fn accept_terms_and_conditions(context: &Context) -> Result<Uuid> {
		let caller_id = context.caller_info()?.user_id;

		context.onboard_usecase.accept_terms_and_conditions(caller_id).await?;

		Ok(caller_id.into())
	}

	pub async fn mark_profile_wizard_as_displayed(context: &Context) -> Result<Uuid> {
		let caller_id = context.caller_info()?.user_id;

		context.onboard_usecase.mark_profile_wizard_as_displayed(caller_id).await?;

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
				invitation_id.into(),
				caller_info.user_id,
				caller_info.github_user_id,
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

	pub async fn apply_to_project(context: &Context, project_id: Uuid) -> Result<Uuid> {
		let caller_id = context.caller_info()?.user_id;

		let application_id =
			context.apply_to_project_usecase.apply(project_id.into(), caller_id).await?;

		Ok(application_id.into())
	}

	pub async fn update_sponsor(
		context: &Context,
		sponsor_id: Uuid,
		name: Option<String>,
		logo_url: Option<Url>,
		url: Nullable<Url>,
	) -> Result<Uuid> {
		let sponsor_id = context
			.update_sponsor_usecase
			.update(
				sponsor_id.into(),
				OptionalNonEmptyTrimmedString::try_from(name)?.into(),
				logo_url,
				url,
			)
			.await?;

		Ok(sponsor_id.into())
	}

	pub fn add_sponsor_to_project(
		context: &Context,
		project_id: Uuid,
		sponsor_id: Uuid,
	) -> Result<Uuid> {
		context.add_sponsor_usecase.add_sponsor(project_id.into(), sponsor_id.into())?;

		Ok(project_id)
	}

	pub fn remove_sponsor_from_project(
		context: &Context,
		project_id: Uuid,
		sponsor_id: Uuid,
	) -> Result<Uuid> {
		context
			.remove_sponsor_usecase
			.remove_sponsor(project_id.into(), sponsor_id.into())?;

		Ok(project_id)
	}
}
