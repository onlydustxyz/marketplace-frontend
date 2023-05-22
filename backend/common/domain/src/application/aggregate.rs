use derive_getters::Getters;
use serde::{Deserialize, Serialize};
use serde_with::serde_as;

use crate::{Aggregate, ApplicationEvent, ApplicationId, Entity, EventSourcable};

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Status {
	#[default]
	Active,
	Cancelled,
}

#[serde_as]
#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct Application {
	id: ApplicationId,
}

impl Entity for Application {
	type Id = ApplicationId;
}

impl Aggregate for Application {
	type Event = ApplicationEvent;
}

impl EventSourcable for Application {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			ApplicationEvent::Received { id, .. } => Self { id: *id },
		}
	}
}
