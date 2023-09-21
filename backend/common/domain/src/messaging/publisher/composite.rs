use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;

use super::Error;
use crate::{Destination, Message};

#[derive(new)]
pub struct Publisher<M: Message + Send + Sync> {
	publishers: Vec<Arc<dyn super::Publisher<M>>>,
}

#[async_trait]
impl<M: Message + Send + Sync> super::Publisher<M> for Publisher<M> {
	async fn publish(&self, destination: Destination, message: &M) -> Result<(), Error> {
		for p in &self.publishers {
			p.publish(destination.clone(), message).await?;
		}
		Ok(())
	}

	async fn publish_many(&self, destination: Destination, messages: &[M]) -> Result<(), Error> {
		for p in &self.publishers {
			p.publish_many(destination.clone(), messages).await?;
		}
		Ok(())
	}
}
