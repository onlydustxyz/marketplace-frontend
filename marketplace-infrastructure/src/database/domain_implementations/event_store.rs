use crate::database::{models, schema::events, Client};
use diesel::prelude::*;
use marketplace_domain::*;

const CONTRIBUTION_AGGREGATE: &str = "CONTRIBUTION";

impl EventStore<contribution::Aggregate> for Client {
	fn append(
		&self,
		aggregate_id: &<contribution::Aggregate as EventAggregate>::Id,
		events: &[<contribution::Aggregate as EventAggregate>::Event],
	) -> Result<(), EventStoreError> {
		let connection = self.connection().map_err(|_| EventStoreError::Connection)?;

		let events = events
			.iter()
			.map(|event| {
				Ok(models::Event {
					aggregate_name: CONTRIBUTION_AGGREGATE.to_string(),
					aggregate_id: aggregate_id.to_string(),
					payload: serde_json::to_value(event)
						.map_err(|_| EventStoreError::InvalidEvent)?,
				})
			})
			.collect::<Result<Vec<_>, EventStoreError>>()?;

		diesel::insert_into(events::table)
			.values(&events)
			.execute(&*connection)
			.map_err(|_| EventStoreError::Append)?;

		Ok(())
	}
}
