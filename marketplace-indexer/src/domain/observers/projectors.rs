use futures::future::join_all;

use super::*;

pub struct EventListenersObserver {
	event_handlers: Vec<Box<dyn EventListener>>,
}

impl EventListenersObserver {
	pub fn new(event_handlers: Vec<Box<dyn EventListener>>) -> Self {
		Self { event_handlers }
	}
}

#[async_trait]
impl Observer for EventListenersObserver {
	async fn on_new_event(&self, observed_event: &ObservedEvent, _block_number: u64) {
		join_all(
			self.event_handlers
				.iter()
				.map(|event_handler| event_handler.on_event(&observed_event.event)),
		)
		.await;
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;

	#[rstest]
	async fn on_new_event() {
		let event = Event::Contribution(ContributionEvent::Validated { id: 0.into() });
		let mut observer1 = MockEventListener::new();
		observer1.expect_on_event().with(eq(event.clone())).return_const(());

		let mut observer2 = MockEventListener::new();
		observer2.expect_on_event().with(eq(event)).return_const(());

		let composite = EventListenersObserver::new(vec![Box::new(observer1), Box::new(observer2)]);
		composite.on_new_event(&Default::default(), 0).await;
	}
}
