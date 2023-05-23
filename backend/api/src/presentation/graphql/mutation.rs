/// Module for payment related mutations in GraphQL schema
use anyhow::anyhow;
use domain::{
    Amount, BlockchainNetwork, Currency, GithubIssue, GithubIssueNumber, GithubRepoId, Iban,
    LogErr, PaymentReason, PaymentReceipt, ProjectId, UserId,
};
use juniper::{graphql_object, DefaultScalarValue, Nullable};
use rusty_money::Money;
use url::Url;
use uuid::Uuid;

use super::{dto, Context, Error, Result};
use crate::{
    domain::user_info::{ContactInformation, Identity, Location, PayoutSettings},
    presentation::http::dto::{
        EthereumIdentityInput, IdentityInput, OptionalNonEmptyTrimmedString, PaymentReference,
        PayoutSettingsInput,
    },
};

/// Payment related mutations in GraphQL schema
pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
    /// Add an Ethereum on-chain payment receipt
    async fn add_eth_payment_receipt(
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

    /// Add a fiat payment receipt
    async fn add_fiat_payment_receipt(
        context: &Context,
        project_id: Uuid,
        payment_id: Uuid,
        amount: String,
        currency_code: String,
        recipient_iban: Iban,
        transaction_reference: String,
    ) -> Result<Uuid> {
        let currency = rusty_money::iso::find(&currency_code).ok_or_else(|| {
            Error::InvalidRequest(anyhow!("Unknown currency code: {currency_code}"))
        })?;

        let amount = Money::from_str(&amount, currency)
            .map_err(|e| Error::InvalidRequest(anyhow::Error::msg(e)))?;

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

    /// Cancel a payment request
    async fn cancel_payment_request(
        context: &Context,
        project_id: Uuid,
        payment_id: Uuid,
    ) -> Result<dto::Payment> {
        let (project, budget, payment) = context
            .cancel_payment_usecase
            .cancel(&project_id.into(), &payment_id.into())
            .await