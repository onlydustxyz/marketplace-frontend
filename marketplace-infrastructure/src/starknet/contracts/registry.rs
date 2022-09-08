use super::{ContractError, ContractViewer};
use crate::starknet::model::OnChainContributorId;
use marketplace_domain::*;
use starknet::core::types::FieldElement;

pub struct Contract {
	contract_viewer: ContractViewer,
}

fn registry_contract_address() -> FieldElement {
	let registry_contract_address =
		std::env::var("REGISTRY_ADDRESS").expect("REGISTRY_ADDRESS must be set");
	FieldElement::from_hex_be(&registry_contract_address)
		.expect("Invalid value for REGISTRY_ADDRESS")
}

impl Default for Contract {
	fn default() -> Self {
		Self {
			contract_viewer: ContractViewer::new(registry_contract_address()),
		}
	}
}

impl Contract {
	pub async fn get_user_information(
		&self,
		account: FieldElement,
	) -> Result<Contributor, ContractError> {
		self.contract_viewer
			.call("get_user_information", vec![account])
			.await
			.map(|fields| Contributor {
				id: OnChainContributorId(fields[1], fields[2]).into(),
				github_handle: Some(fields[3].to_string()),
				github_username: None,
				account: format!("{account:#x}").parse().unwrap(),
			})
	}
}
