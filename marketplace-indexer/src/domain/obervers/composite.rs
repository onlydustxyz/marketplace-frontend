use std::sync::Arc;

use super::*;

pub struct ObserverComposite(Vec<Arc<dyn Observer>>);

impl ObserverComposite {
	pub fn new(observers: Vec<Arc<dyn Observer>>) -> Self {
		Self(observers)
	}
}

impl Observer for ObserverComposite {
	fn on_connect(&self, indexer_id: &IndexerId) {
		self.0.iter().for_each(|observer| observer.on_connect(indexer_id))
	}

	fn on_new_event(&self, event: &ObservedEvent, block_number: u64) {
		self.0.iter().for_each(|observer| observer.on_new_event(event, block_number))
	}

	fn on_new_block(&self, block_hash: &BlockHash, block_number: u64) {
		self.0
			.iter()
			.for_each(|observer| observer.on_new_block(block_hash, block_number))
	}

	fn on_reorg(&self) {
		self.0.iter().for_each(|observer| observer.on_reorg())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use std::str::FromStr;

	#[fixture]
	fn event() -> ObservedEvent {
		ObservedEvent::default()
	}

	#[fixture]
	fn block_number() -> u64 {
		42
	}

	#[rstest]
	fn on_new_event(event: ObservedEvent, block_number: u64) {
		let mut observer1 = MockObserver::new();
		observer1
			.expect_on_new_event()
			.with(eq(event.clone()), eq(block_number))
			.return_const(());

		let mut observer2 = MockObserver::new();
		observer2
			.expect_on_new_event()
			.with(eq(event.clone()), eq(block_number))
			.return_const(());

		let composite = ObserverComposite::new(vec![Arc::new(observer1), Arc::new(observer2)]);
		composite.on_new_event(&event, block_number);
	}

	#[test]
	fn on_connect() {
		let mut observer1 = MockObserver::new();
		observer1.expect_on_connect().with(eq(IndexerId::from("ID"))).return_const(());

		let mut observer2 = MockObserver::new();
		observer2.expect_on_connect().with(eq(IndexerId::from("ID"))).return_const(());

		let composite = ObserverComposite::new(vec![Arc::new(observer1), Arc::new(observer2)]);
		composite.on_connect(&IndexerId::from("ID"));
	}

	#[test]
	fn on_new_block() {
		let block_hash = BlockHash::from_str("0x1234").unwrap();
		let block_number = 1234;

		let mut observer1 = MockObserver::new();
		observer1
			.expect_on_new_block()
			.with(eq(block_hash.clone()), eq(block_number))
			.return_const(());

		let mut observer2 = MockObserver::new();
		observer2
			.expect_on_new_block()
			.with(eq(block_hash.clone()), eq(block_number))
			.return_const(());

		let composite = ObserverComposite::new(vec![Arc::new(observer1), Arc::new(observer2)]);
		composite.on_new_block(&block_hash, block_number);
	}

	#[test]
	fn on_reorg() {
		let mut observer1 = MockObserver::new();
		observer1.expect_on_reorg().return_const(());

		let mut observer2 = MockObserver::new();
		observer2.expect_on_reorg().return_const(());

		let composite = ObserverComposite::new(vec![Arc::new(observer1), Arc::new(observer2)]);
		composite.on_reorg();
	}
}
