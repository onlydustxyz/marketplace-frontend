use anyhow::anyhow;
use domain::{Event, Subscriber, SubscriberCallbackError};
use infrastructure::amqp::{self, UniqueMessage};
use tokio::sync::mpsc::{self, Receiver, Sender};

pub async fn listen_events(config: amqp::Config) -> Receiver<Event> {
	let bus = event_store::bus::consumer(config)
		.await
		.expect("Unable to create the event consumer");

	let (tx, rx) = mpsc::channel(1024);

	let _handle =
		tokio::spawn(
			async move { bus.subscribe(|message| process_event(message, tx.clone())).await },
		);

	rx
}

async fn process_event(
	message: UniqueMessage<Event>,
	tx: Sender<Event>,
) -> std::result::Result<(), SubscriberCallbackError> {
	olog::info!(message = message.to_string(), "Received message");

	tx.send(message.payload().clone())
		.await
		.map_err(|e| SubscriberCallbackError::Fatal(anyhow!(e)))
}
