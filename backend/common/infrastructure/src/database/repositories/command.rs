use chrono::{NaiveDateTime, TimeZone, Utc};
use diesel::{query_dsl::filter_dsl::FindDsl, ExpressionMethods, OptionalExtension, RunQueryDsl};
use domain::{CommandId, CommandRepository};
use serde::{Deserialize, Serialize};

use crate::database::{
	schema::{commands, commands::dsl},
	Client,
};

#[derive(
	Debug, Clone, Insertable, Serialize, Deserialize, Queryable, AsChangeset, Identifiable,
)]
#[primary_key(id)]
pub struct Command {
	#[diesel(deserialize_as = "uuid::Uuid")]
	pub id: CommandId,
	pub processing_count: i32,
	pub created_at: NaiveDateTime,
	pub updated_at: Option<NaiveDateTime>,
	pub metadata: serde_json::Value,
}

impl TryFrom<Command> for domain::Command {
	type Error = anyhow::Error;

	fn try_from(command: Command) -> Result<Self, Self::Error> {
		Ok(Self {
			id: command.id,
			processing_count: command.processing_count,
			created_at: Utc.from_utc_datetime(&command.created_at),
			updated_at: command.updated_at.map(|updated_at| Utc.from_utc_datetime(&updated_at)),
			metadata: serde_json::from_value(command.metadata)?,
		})
	}
}

impl TryFrom<domain::Command> for Command {
	type Error = anyhow::Error;

	fn try_from(command: domain::Command) -> Result<Self, Self::Error> {
		Ok(Self {
			id: command.id,
			processing_count: command.processing_count,
			created_at: command.created_at.naive_utc(),
			updated_at: command.updated_at.map(|updated_at| updated_at.naive_utc()),
			metadata: serde_json::to_value(command.metadata)?,
		})
	}
}

impl CommandRepository for Client {
	fn find_by_id_or_default(&self, id: &CommandId) -> anyhow::Result<domain::Command> {
		let connection = self.connection()?;
		let command: Option<Command> = dsl::commands.find(*id).first(&*connection).optional()?;
		if let Some(command) = command {
			command.try_into()
		} else {
			Ok(domain::Command {
				id: *id,
				created_at: Utc::now(),
				..Default::default()
			})
		}
	}

	fn upsert(&self, command: domain::Command) -> anyhow::Result<()> {
		let command: Command = command.try_into()?;
		let connection = self.connection()?;
		diesel::insert_into(dsl::commands)
			.values(command.clone())
			.on_conflict(dsl::id)
			.do_update()
			.set(command)
			.execute(&*connection)?;
		Ok(())
	}

	fn decrease_processing_count(&self, id: &CommandId) -> anyhow::Result<()> {
		let connection = self.connection()?;
		diesel::update(dsl::commands)
			.filter(dsl::id.eq(id))
			.set(dsl::processing_count.eq(dsl::processing_count - 1))
			.execute(&*connection)?;
		Ok(())
	}
}
