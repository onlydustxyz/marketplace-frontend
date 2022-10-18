use super::{EventTranslator, FromEventError, StarknetTopics, Topics};
use marketplace_domain::{
	ContractAddress, ContributorAccountAddress, Event as DomainEvent, ProjectEvent, ProjectId,
};
use starknet::core::{types::FieldElement, utils::get_selector_from_name};

pub struct MemberRemoved;

impl EventTranslator for MemberRemoved {
	fn selector() -> FieldElement {
		get_selector_from_name("ProjectMemberRemoved").unwrap()
	}

	fn to_domain_event(
		_: &Option<ContractAddress>,
		_: &ContractAddress,
		mut topics: Topics,
	) -> Result<DomainEvent, FromEventError> {
		let project_id: u128 = topics.pop_front_as()?;
		let contributor_account_address: ContributorAccountAddress = topics.pop_front_as()?;

		Ok(DomainEvent::Project(ProjectEvent::MemberRemoved {
			project_id: project_id as ProjectId,
			contributor_account: contributor_account_address,
		}))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[fixture]
	fn apibara_event_data() -> Topics {
		vec![
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 12,
			],
			vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 24,
			],
		]
		.into()
	}

	#[rstest]
	fn selector() {
		assert_eq!(
			get_selector_from_name("ProjectMemberRemoved").unwrap(),
			<MemberRemoved as EventTranslator>::selector()
		);
	}

	#[rstest]
	fn create_event_from_apibara(apibara_event_data: Topics) {
		let result = <MemberRemoved as EventTranslator>::to_domain_event(
			&Default::default(),
			&Default::default(),
			apibara_event_data,
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(
			DomainEvent::Project(ProjectEvent::MemberRemoved {
				project_id: 12,
				contributor_account: 24.into()
			},),
			result.unwrap()
		);
	}
}
