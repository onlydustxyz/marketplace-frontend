web: ROCKET_PORT=$PORT ./target/release/marketplace-core
indexer: ./target/release/marketplace-indexer
event-store: AMQP_ADDR=$CLOUDAMQP_URL ./target/release/marketplace-event-store
event-listeners: AMQP_ADDR=$CLOUDAMQP_URL ./target/release/event_listeners
