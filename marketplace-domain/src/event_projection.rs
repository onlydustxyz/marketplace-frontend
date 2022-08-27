use crate::AggregateRoot;

pub trait Projection<A: AggregateRoot>: Send + Sync {
	fn project(&self, event: &A::Event);
}
