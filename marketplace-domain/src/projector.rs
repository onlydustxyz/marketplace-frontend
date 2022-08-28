use crate::Aggregate;

pub trait Projector<A: Aggregate>: Send + Sync {
	fn project(&self, event: &A::Event);
}
