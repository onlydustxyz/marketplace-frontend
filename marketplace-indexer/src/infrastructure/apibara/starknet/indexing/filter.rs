use crate::{
	domain::{EventFilterRepository, EventFilterRepositoryError},
	infrastructure::apibara::starknet::events::Event,
};

pub trait Filtered: Sized {
	type Error;
	fn filtered(
		self,
		event_filter_repository: &dyn EventFilterRepository,
	) -> Result<Self, Self::Error>;
}

impl Filtered for Vec<Event> {
	type Error = EventFilterRepositoryError;

	fn filtered(
		self,
		event_filter_repository: &dyn EventFilterRepository,
	) -> Result<Self, Self::Error> {
		let mut events = Self::new();
		for event in self {
			if event_filter_repository.contract_address_matches(&event.from_address)? {
				events.push(event);
			}
		}
		Ok(events)
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::{
		test::{As0xString, CONTRACT_ADDRESSES},
		MockEventFilterRepository,
	};
	use rstest::*;

	#[fixture]
	fn event_filter_repository() -> MockEventFilterRepository {
		MockEventFilterRepository::new()
	}

	#[rstest]
	fn events_are_filtered(mut event_filter_repository: MockEventFilterRepository) {
		let events = CONTRACT_ADDRESSES
			.map(|address| Event {
				from_address: address.as_0x_string(),
				..Default::default()
			})
			.to_vec();

		event_filter_repository
			.expect_contract_address_matches()
			.times(3)
			.returning(|address| Ok(address.to_string() != CONTRACT_ADDRESSES[1].to_lowercase()));

		let filtered_events =
			events.filtered(&event_filter_repository).expect("Error while filtering events");

		assert_eq!(2, filtered_events.len());
		assert_eq!(
			CONTRACT_ADDRESSES[0].to_lowercase(),
			filtered_events[0].from_address.to_string()
		);
		assert_eq!(
			CONTRACT_ADDRESSES[2].to_lowercase(),
			filtered_events[1].from_address.to_string()
		);
	}
}
