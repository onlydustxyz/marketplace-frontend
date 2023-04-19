#!/bin/bash

APP_BINARY=$1
PORT=$2

cargo run -p $APP_BINARY >$APP_BINARY.log 2>&1 &

APP_PID=$!
echo "Waiting for $APP_BINARY app to start on port $PORT..."

while ! nc -z localhost $PORT >/dev/null 2>&1; do
  sleep 1
done

echo "App started with PID: $APP_PID"
echo $APP_PID > $APP_BINARY.pid
