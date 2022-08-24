use crypto_bigint::{Encoding, Split, U128, U256};
use marketplace_domain::{u256_from_string, ContributorId};
use starknet::core::types::FieldElement;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct OnChainContributorId(pub FieldElement, pub FieldElement);

impl From<ContributorId> for OnChainContributorId {
	fn from(id: ContributorId) -> Self {
		let id = u256_from_string(&id.to_string()).unwrap(); // Contributor ID is a U256 by design and cannot be bigger
		let (high, low) = id.split();
		let high = U256::from((U128::default(), high));
		let low = U256::from((U128::default(), low));
		Self(
			FieldElement::from_bytes_be(&low.to_be_bytes()).unwrap(),
			FieldElement::from_bytes_be(&high.to_be_bytes()).unwrap(),
		)
	}
}

impl From<OnChainContributorId> for ContributorId {
	fn from(OnChainContributorId(low, high): OnChainContributorId) -> Self {
		let (_, low) = U256::from_be_bytes(low.to_bytes_be()).split();
		let (_, high) = U256::from_be_bytes(high.to_bytes_be()).split();
		U256::from((high, low)).into()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use starknet::core::types::FieldElement;
	use std::str::FromStr;

	#[test]
	fn test_convert_contributor_id_from_and_to_felt() {
		let contributor_id_felt = OnChainContributorId(
			FieldElement::from_dec_str("123").unwrap(),
			FieldElement::from_dec_str("456").unwrap(),
		);

		let contributor_id = ContributorId::from_str(
			"0x000000000000000000000000000001c80000000000000000000000000000007b",
		)
		.unwrap();

		assert_eq!(contributor_id, contributor_id_felt.clone().into());
		assert_eq!(contributor_id_felt, contributor_id.into());
	}
}
