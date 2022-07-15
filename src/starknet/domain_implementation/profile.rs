use async_trait::async_trait;
use starknet::core::types::FieldElement;

use crate::{domain::*, starknet::contract_viewer::ContractViewer};

pub struct Profile {
    contract_viewer: ContractViewer,
}

fn profile_contract_address() -> FieldElement {
    let profile_contract_address =
        std::env::var("PROFILE_ADDRESS").expect("PROFILE_ADDRESS must be set");
    FieldElement::from_hex_be(&profile_contract_address).expect("Invalid value for PROFILE_ADDRESS")
}

impl Default for Profile {
    fn default() -> Self {
        Self {
            contract_viewer: ContractViewer::new(profile_contract_address()),
        }
    }
}

#[async_trait]
impl ContributorProfileViewer for Profile {
    async fn get_account(&self, contributor_id: &ContributorId) -> Option<FieldElement> {
        let contributor_id: (FieldElement, FieldElement) = contributor_id.into();
        self.contract_viewer
            .call("ownerOf", vec![contributor_id.0, contributor_id.1])
            .await
            .map(|c| c[0])
            .ok()
    }
}
