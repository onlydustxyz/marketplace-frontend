web: amqp.url=$CLOUDAMQP_URL ROCKET_PORT=$PORT ./target/release/api
event-store: amqp.url=$CLOUDAMQP_URL ./target/release/event-store
event-listeners: amqp.url=$CLOUDAMQP_URL WEBSERVER_PORT=$PORT ./target/release/event-listeners
github-proxy: ROCKET_PORT=$PORT ./target/release/github-proxy
release: ./hasura/update-metadata.sh
