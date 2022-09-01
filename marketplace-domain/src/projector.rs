use async_trait::async_trait;

use crate::Aggregate;

#[async_trait]
pub trait Projector<A: Aggregate>: Send + Sync {
	async fn project(&self, event: &A::Event);
}
