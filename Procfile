web: AMQP_ADDR=$CLOUDAMQP_URL ROCKET_PORT=$PORT ./target/release/api
event-store: AMQP_ADDR=$CLOUDAMQP_URL ./target/release/event-store
event-listeners: AMQP_ADDR=$CLOUDAMQP_URL WEBSERVER_PORT=$PORT ./target/release/event-listeners
github-proxy: ROCKET_PORT=$PORT ./target/release/github-proxy
release: ./hasura/update-metadata.sh
