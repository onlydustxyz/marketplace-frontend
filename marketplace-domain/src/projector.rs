use async_trait::async_trait;

use crate::{Aggregate, Projection};

#[async_trait]
pub trait Projector<P: Projection>: Send + Sync {
	async fn project(&self, event: &<P::A as Aggregate>::Event);
}
