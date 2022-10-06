use std::sync::Arc;

use marketplace_domain::*;
use uuid::Uuid;

use crate::database::{init_pool, Client};

#[test]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]

fn get_contributor_contact_information_ok() {
	let client = Client::new(init_pool());

	let contributor_id: ContributorAccount = 3.into();

	let contact_information = ContactInformation {
		id: Uuid::new_v4().into(),
		contributor_id: contributor_id.clone(),
		discord_handle: Some(String::from("discord")),
	};

	<Client as ContactInformationRepository>::upsert(&client, contact_information.clone()).unwrap();

	let contact_information_service = ContactInformationServiceImplementation::new(
		Arc::new(client) as Arc<dyn ContactInformationRepository>,
	);

	let found_contact_information = contact_information_service
		.get_contributor_contact_information(&contributor_id)
		.unwrap();

	assert_eq!(found_contact_information, Some(contact_information));
}

#[test]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]

fn set_contributor_contact_information_ok() {
	let client = Client::new(init_pool());

	let contact_information_service = ContactInformationServiceImplementation::new(
		Arc::new(client) as Arc<dyn ContactInformationRepository>,
	);

	let contributor_id = 3.into();

	let not_found_contact_information = contact_information_service
		.get_contributor_contact_information(&contributor_id)
		.unwrap();

	// Check None
	assert_eq!(not_found_contact_information, None);

	// Do Set
	contact_information_service
		.set_contributor_contact_information(&contributor_id, Some(String::from("discord")))
		.unwrap();

	// Check found
	let found_contact_information = contact_information_service
		.get_contributor_contact_information(&contributor_id)
		.unwrap()
		.unwrap();

	assert_eq!(found_contact_information.contributor_id, contributor_id);
	assert_eq!(
		found_contact_information.discord_handle,
		Some(String::from("discord"))
	);

	let found_contact_information_id = found_contact_information.id;

	// Set update
	contact_information_service
		.set_contributor_contact_information(&contributor_id, Some(String::from("discord#1234")))
		.unwrap();

	let new_contact_information = ContactInformation {
		id: found_contact_information_id,
		contributor_id: contributor_id.to_owned(),
		discord_handle: Some(String::from("discord#1234")),
	};

	// Get and check updated
	let found_contact_information = contact_information_service
		.get_contributor_contact_information(&contributor_id)
		.unwrap();

	assert_eq!(found_contact_information, Some(new_contact_information));
}
