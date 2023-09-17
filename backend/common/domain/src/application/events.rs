use std::fmt::Display;

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_with::serde_as;

use crate::{AggregateEvent, ApplicationId, ProjectId, UserId};

#[serde_as]
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Received {
		id: ApplicationId,
		project_id: ProjectId,
		applicant_id: UserId,
		received_at: NaiveDateTime,
	},
}

impl AggregateEvent<ApplicationId> for Event {
	fn aggregate_id(&self) -> &ApplicationId {
		match self {
			Self::Received { id, .. } => id,
		}
	}
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		crate::Event::Application(event)
	}
}
