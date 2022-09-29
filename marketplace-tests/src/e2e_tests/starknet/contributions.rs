use super::*;
use async_trait::async_trait;
use starknet::core::utils::get_selector_from_name;

// From starknet-devnet dump creation
const CONTRIBUTIONS_ADDRESS: &str =
	"0x000b061238977bb1bd59c2c81bc5670fc2dfbac3854b7a25d9010dffb823b87f";

#[async_trait]
pub trait ContributionsContract {
	async fn add_lead_contributor_for_project(
		&self,
		project_id: u64,
		contributor_account: FieldElement,
	) -> Result<()>;

	async fn new_contribution(&self, project_id: u64, issue_number: u64, gate: u64) -> Result<()>;
	async fn delete_contribution(&self, contribution_id: u64) -> Result<()>;
}

#[async_trait]
impl<'a> ContributionsContract for ContractAdministrator<'a> {
	async fn add_lead_contributor_for_project(
		&self,
		project_id: u64,
		contributor_account: FieldElement,
	) -> Result<()> {
		self.send_transaction(&[Call {
			to: FieldElement::from_hex_be(CONTRIBUTIONS_ADDRESS)
				.expect("Invalid CONTRIBUTIONS_ADDRESS"),
			selector: get_selector_from_name("add_lead_contributor_for_project")
				.expect("Invalid selector"),
			calldata: vec![FieldElement::from(project_id), contributor_account],
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

	async fn delete_contribution(&self, contribution_id: u64) -> Result<()> {
		self.send_transaction(&[Call {
			to: FieldElement::from_hex_be(CONTRIBUTIONS_ADDRESS)
				.expect("Invalid CONTRIBUTIONS_ADDRESS"),
			selector: get_selector_from_name("delete_contribution").expect("Invalid selector"),
			calldata: vec![FieldElement::from(contribution_id)],
		}])
		.await?;

		Ok(())
	}
}
