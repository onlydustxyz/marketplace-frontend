use crate::AggregateRoot;

pub trait Projector<A: AggregateRoot>: Send + Sync {
	fn project(&self, event: &A::Event);
}
