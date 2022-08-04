use crate::domain::*;
use crypto_bigint::{Encoding, Split, U128, U256};
use starknet::core::types::FieldElement;

impl From<ContributorId> for (FieldElement, FieldElement) {
	fn from(id: ContributorId) -> Self {
		let (high, low) = id.0.split();
		let high = U256::from((U128::default(), high));
		let low = U256::from((U128::default(), low));
		(
			FieldElement::from_bytes_be(&low.to_be_bytes()).unwrap(),
			FieldElement::from_bytes_be(&high.to_be_bytes()).unwrap(),
		)
	}
}

impl From<(FieldElement, FieldElement)> for ContributorId {
	fn from((low, high): (FieldElement, FieldElement)) -> Self {
		let (_, low) = U256::from_be_bytes(low.to_bytes_be()).split();
		let (_, high) = U256::from_be_bytes(high.to_bytes_be()).split();
		Self(U256::from((high, low)))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use starknet::core::types::FieldElement;

	#[test]
	fn test_convert_contributor_id_from_and_to_felt() {
		let contributor_id_felt = (
			FieldElement::from_dec_str("123").unwrap(),
			FieldElement::from_dec_str("456").unwrap(),
		);

		let contributor_id: ContributorId =
			"000000000000000000000000000001c80000000000000000000000000000007b".into();

		assert_eq!(contributor_id, contributor_id_felt.into());
		assert_eq!(contributor_id_felt, contributor_id.into());
	}
}
