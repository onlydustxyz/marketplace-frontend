use async_trait::async_trait;
use futures::lock::Mutex;
use log::{debug, error};
use starknet::core::types::FieldElement;
use std::collections::{hash_map::Entry, HashMap};

use crate::{domain::*, starknet::contract_viewer::ContractViewer};

pub struct Registry {
    contract_viewer: ContractViewer,
    users: Mutex<HashMap<String, Option<Contributor>>>,
}

fn registry_contract_address() -> FieldElement {
    let registry_contract_address =
        std::env::var("REGISTRY_ADDRESS").expect("REGISTRY_ADDRESS must be set");
    FieldElement::from_hex_be(&registry_contract_address)
        .expect("Invalid value for REGISTRY_ADDRESS")
}

impl Default for Registry {
    fn default() -> Self {
        Self {
            contract_viewer: ContractViewer::new(registry_contract_address()),
            users: Mutex::new(HashMap::new()),
        }
    }
}

impl Registry {
    async fn get_user_information_in_contract_from_github_identifier(
        &self,
        github_identifier: &str,
    ) -> Option<Contributor> {
        debug!("Getting user information for {}", github_identifier);

        let github_identifier = match FieldElement::from_dec_str(github_identifier) {
            Ok(identifier) => identifier,
            Err(e) => {
                error!(
                    "Failed to convert {} to FieldElement: {}",
                    github_identifier, e
                );
                return None;
            }
        };

        self.contract_viewer
            .call(
                "get_user_information_from_github_identifier",
                vec![github_identifier],
            )
            .await
            .map(|c| c.into())
            .ok()
    }
}

#[async_trait]
impl ContributorRegistryViewer for Registry {
    async fn get_user_information_from_github_identifier(
        &self,
        github_userid: &str,
    ) -> Option<Contributor> {
        match self.users.lock().await.entry(github_userid.into()) {
            Entry::Occupied(entry) => entry.get().to_owned(),
            Entry::Vacant(entry) => entry
                .insert(
                    self.get_user_information_in_contract_from_github_identifier(github_userid)
                        .await,
                )
                .to_owned(),
        }
    }

    async fn get_user_information(&self, account: FieldElement) -> Option<Contributor> {
        self.contract_viewer
            .call("get_user_information", vec![account])
            .await
            .map(|c| c.into())
            .ok()
    }
}

impl From<Vec<FieldElement>> for Contributor {
    fn from(fields: Vec<FieldElement>) -> Self {
        Self {
            id: (fields[1], fields[2]).into(),
            github_handle: Some(fields[3].to_string()),
            github_username: None,
        }
    }
}
