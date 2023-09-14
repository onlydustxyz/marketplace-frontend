use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{ApplicationEvent, Event, SubscriberCallbackError};
use infrastructure::database::Repository;
use tracing::instrument;

use super::EventListener;
use crate::models::*;

#[derive(new)]
pub struct Projector {
	applications_repository: Arc<dyn Repository<Application>>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Application(event) = event {
			match event {
				ApplicationEvent::Received {
					id,
					project_id,
					applicant_id,
					received_at,
				} => {
					self.applications_repository.try_insert(Application {
						id,
						received_at,
						project_id,
						applicant_id,
					})?;
				},
			}
		}

		Ok(())
	}
}
