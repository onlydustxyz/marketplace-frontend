use marketplace_domain::*;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EventFilter {
	pub contract_address: ContractAddress,
	pub event_name: String,
}

impl EventFilter {
	pub fn new<STRING: Into<String>>(
		contract_address: ContractAddress,
		event_name: STRING,
	) -> Self {
		Self {
			contract_address,
			event_name: event_name.into(),
		}
	}
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;

	#[test]
	fn event_filter_can_be_created() {
		EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "my_event");
	}
}
