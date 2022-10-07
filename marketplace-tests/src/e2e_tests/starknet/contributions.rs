use std::str::FromStr;

use async_trait::async_trait;
use starknet::core::utils::get_selector_from_name;

use super::*;

// From starknet-devnet dump creation
const CONTRIBUTIONS_ADDRESS: &str =
	"0x03f0e236a4cb1b20278ad5a7e790b29c6e5bac25c34fc3fb0c092f8e5275b512";

#[async_trait]
pub trait ContributionsContract {
	async fn add_lead_contributor_for_project(
		&self,
		project_id: u64,
		contributor_account_address: FieldElement,
	) -> Result<()>;

	async fn new_contribution(&self, project_id: u64, issue_number: u64, gate: u64) -> Result<()>;
	async fn delete_contribution(&self, contribution_id: &str) -> Result<()>;

	async fn assign_contributor_to_contribution(
		&self,
		contribution_id: &str,
		contributor_address: &str,
	) -> Result<()>;
}

#[async_trait]
impl<'a> ContributionsContract for ContractAdministrator<'a> {
	async fn add_lead_contributor_for_project(
		&self,
		project_id: u64,
		contributor_account_address: FieldElement,
	) -> Result<()> {
		self.send_transaction(&[Call {
			to: FieldElement::from_hex_be(CONTRIBUTIONS_ADDRESS)
				.expect("Invalid CONTRIBUTIONS_ADDRESS"),
			selector: get_selector_from_name("add_lead_contributor_for_project")
				.expect("Invalid selector"),
			calldata: vec![FieldElement::from(project_id), contributor_account_address],
		}])
		.await?;

		Ok(())
	}

	async fn new_contribution(&self, project_id: u64, issue_number: u64, gate: u64) -> Result<()> {
		self.send_transaction(&[Call {
			to: FieldElement::from_hex_be(CONTRIBUTIONS_ADDRESS)
				.expect("Invalid CONTRIBUTIONS_ADDRESS"),
			selector: get_selector_from_name("new_contribution").expect("Invalid selector"),
			calldata: vec![
				FieldElement::from(project_id),
				FieldElement::from(issue_number),
				FieldElement::from(gate),
			],
		}])
		.await?;

		Ok(())
	}

	async fn delete_contribution(&self, contribution_id: &str) -> Result<()> {
		self.send_transaction(&[Call {
			to: FieldElement::from_hex_be(CONTRIBUTIONS_ADDRESS)
				.expect("Invalid CONTRIBUTIONS_ADDRESS"),
			selector: get_selector_from_name("delete_contribution").expect("Invalid selector"),
			calldata: vec![FieldElement::from_hex_be(contribution_id).unwrap()],
		}])
		.await?;

		Ok(())
	}

	async fn assign_contributor_to_contribution(
		&self,
		contribution_id: &str,
		contributor_address: &str,
	) -> Result<()> {
		self.send_transaction(&[Call {
			to: FieldElement::from_hex_be(CONTRIBUTIONS_ADDRESS)
				.expect("Invalid CONTRIBUTIONS_ADDRESS"),
			selector: get_selector_from_name("assign_contributor_to_contribution")
				.expect("Invalid selector"),
			calldata: vec![
				FieldElement::from_hex_be(contribution_id).unwrap(),
				FieldElement::from_str(contributor_address).unwrap(),
				FieldElement::ZERO,
			],
		}])
		.await?;

		Ok(())
	}
}
