use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;

use super::Error;
use crate::Message;

#[derive(new)]
pub struct Publisher<M: Message + Send + Sync> {
	publishers: Vec<Arc<dyn super::Publisher<M>>>,
}

#[async_trait]
impl<M: Message + Send + Sync> super::Publisher<M> for Publisher<M> {
	async fn publish(&self, message: &M) -> Result<(), Error> {
		for p in &self.publishers {
			p.publish(message).await?;
		}
		Ok(())
	}

	async fn publish_many(&self, messages: &[M]) -> Result<(), Error> {
		for p in &self.publishers {
			p.publish_many(messages).await?;
		}
		Ok(())
	}
}
