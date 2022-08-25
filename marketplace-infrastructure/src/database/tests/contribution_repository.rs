use crate::database::{init_pool, tests::init_project, Client};

use marketplace_domain::*;
use uuid::Uuid;

#[test]
#[ignore = "require a database"]
fn store_and_find() {
	let client = Client::new(init_pool());

	let project = init_project(&client);

	let contribution1 = Contribution {
		id: Uuid::new_v4().into(),
		onchain_id: "1".to_string(),
		project_id: project.id.to_owned(),
		..Default::default()
	};
	let contribution2 = Contribution {
		id: Uuid::new_v4().into(),
		onchain_id: "2".to_string(),
		project_id: project.id.to_owned(),
		..Default::default()
	};

	<Client as ContributionRepository>::create(&client, contribution1.clone(), Default::default())
		.unwrap();
	<Client as ContributionRepository>::create(&client, contribution2.clone(), Default::default())
		.unwrap();

	let found_contribution =
		<Client as ContributionRepository>::find_by_onchain_id(&client, &contribution1.onchain_id)
			.unwrap();
	assert_eq!(found_contribution, Some(contribution1));

	let found_contribution =
		<Client as ContributionRepository>::find_by_onchain_id(&client, &contribution2.onchain_id)
			.unwrap();
	assert_eq!(found_contribution, Some(contribution2));
}
