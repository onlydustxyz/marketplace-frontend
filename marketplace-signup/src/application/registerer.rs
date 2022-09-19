use crate::domain::{
	errors::RegistrationError,
	services::{identity_provider::IdentityProvider, onchain_registry::OnChainRegistry},
};
use async_trait::async_trait;

#[async_trait]
pub trait Registerer<P, R>: Send + Sync
where
	P: IdentityProvider,
	R: OnChainRegistry,
{
	async fn register_contributor(
		&self,
		authorization_code: String,
		account_address: R::AccountAddress,
		signed_data: R::SignedData,
	) -> Result<R::TransactionHash, RegistrationError>;
}

pub struct RegistererImpl<P, R>
where
	P: IdentityProvider,
	R: OnChainRegistry,
{
	identity_provider: P,
	registry: R,
}

impl<P, R> RegistererImpl<P, R>
where
	P: IdentityProvider,
	R: OnChainRegistry,
{
	pub fn new(identity_provider: P, registry: R) -> Self {
		RegistererImpl::<P, R> {
			identity_provider,
			registry,
		}
	}
}

#[async_trait]
impl<P, R> Registerer<P, R> for RegistererImpl<P, R>
where
	P: IdentityProvider,
	R: OnChainRegistry,
{
	async fn register_contributor(
		&self,
		authorization_code: String,
		account_address: R::AccountAddress,
		signed_data: R::SignedData,
	) -> Result<R::TransactionHash, RegistrationError> {
		let access_token = self
			.identity_provider
			.new_access_token(&authorization_code)
			.await
			.map_err(RegistrationError::Authentication)?;

		let user_id = self
			.identity_provider
			.get_user_id(&access_token)
			.await
			.map_err(RegistrationError::Identification)?;

		self.registry
			.check_signature(signed_data, account_address.clone())
			.await
			.map_err(RegistrationError::Signature)?;

		let transaction_hash = self
			.registry
			.register_contributor(account_address, user_id.into())
			.await
			.map_err(RegistrationError::Registry)?;

		Ok(transaction_hash)
	}
}

#[cfg(test)]
mod tests {
	use claim::assert_ok_eq;
	use mockall::{mock, predicate::eq};
	use rocket::tokio;
	use starknet::{core::types::FieldElement, macros::felt};

	use crate::{
		application::registerer::{Registerer, RegistererImpl},
		domain::{
			errors::{AuthenticationError, IdentificationError, RegistryError, SignatureError},
			services::{identity_provider::IdentityProvider, onchain_registry::OnChainRegistry},
			value_objects::{AccessToken, Identity},
		},
		infrastructure::{StarknetSignature, StarknetSignedData},
	};

	mock! {
		MyIdentityProvider {}
		#[async_trait]
		impl IdentityProvider for MyIdentityProvider {
			async fn new_access_token(
				&self,
				authorization_code: &str,
			) -> Result<AccessToken, AuthenticationError>;

			async fn get_user_id(
				&self,
				access_token: &AccessToken,
			) -> Result<Identity, IdentificationError>;
		}
	}

	mock! {
		MyOnChainRegistry {}
		#[async_trait]
		impl OnChainRegistry for MyOnChainRegistry {
			type SignedData = StarknetSignedData;
			type AccountAddress = FieldElement;
			type TransactionHash = FieldElement;
			type ContributorId = FieldElement;

			async fn check_signature(
				&self,
				signed_data: <MockMyOnChainRegistry as OnChainRegistry>::SignedData,
				account_address: <MockMyOnChainRegistry as OnChainRegistry>::AccountAddress,
			) -> Result<(), SignatureError>;

			async fn register_contributor(
				&self,
				user_account_address: <MockMyOnChainRegistry as OnChainRegistry>::AccountAddress,
				user_id: <MockMyOnChainRegistry as OnChainRegistry>::ContributorId,
			) -> Result<<MockMyOnChainRegistry as OnChainRegistry>::TransactionHash, RegistryError>;
		}
	}

	#[tokio::test]
	async fn test_register_github_user() {
		let mut github_mock = MockMyIdentityProvider::new();

		github_mock
			.expect_new_access_token()
			.with(eq("foo-code"))
			.times(1)
			.returning(|_| Ok(AccessToken::from("foo-token".to_string())));

		github_mock
			.expect_get_user_id()
			.with(eq(AccessToken::from("foo-token".to_string())))
			.times(1)
			.returning(|_| Ok(Identity::GitHubId(42.into())));

		let mut registry_mock = MockMyOnChainRegistry::new();

		registry_mock
			.expect_check_signature()
			.with(
				eq(StarknetSignedData {
					hash: felt!(
						"0x287b943b1934949486006ad63ac0293038b6c818b858b09f8e0a9da12fc4074"
					),
					signature: StarknetSignature {
						r: felt!(
							"0xde4d49b21dd8714eaf5a1b480d8ede84d2230d1763cfe06762d8a117493bcd"
						),
						s: felt!(
							"0x4b61402b98b29a34bd4cba8b5eabae840809914160002385444059f59449a4"
						),
					},
				}),
				eq(felt!(
					"0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace"
				)),
			)
			.times(1)
			.returning(|_, _| Ok(()));

		registry_mock
			.expect_register_contributor()
			.with(
				eq(felt!(
					"0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace"
				)),
				eq(FieldElement::from(42u32)),
			)
			.times(1)
			.returning(|_, _| Ok(felt!("0x666")));

		let registerer = RegistererImpl::new(github_mock, registry_mock);

		let registration = registerer
			.register_contributor(
				"foo-code".to_string(),
				felt!("0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace"),
				StarknetSignedData {
					hash: felt!(
						"0x287b943b1934949486006ad63ac0293038b6c818b858b09f8e0a9da12fc4074"
					),
					signature: StarknetSignature {
						r: felt!(
							"0xde4d49b21dd8714eaf5a1b480d8ede84d2230d1763cfe06762d8a117493bcd"
						),
						s: felt!(
							"0x4b61402b98b29a34bd4cba8b5eabae840809914160002385444059f59449a4"
						),
					},
				},
			)
			.await;

		assert_ok_eq!(registration, felt!("0x666"));
	}
}
