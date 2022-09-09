use crate::Aggregate;

pub trait Projection {
	type A: Aggregate;
}
