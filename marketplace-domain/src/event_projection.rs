use crate::EventAggregate;

pub trait Projection<A: EventAggregate>: Send + Sync {
	fn project(&self, event: &A::Event);
}
