use super::{Message, Publisher, Subscriber};

pub trait Bus<M: Message>: Publisher<M> + Subscriber<M> {}
