#!/bin/bash

APP_BINARY=$1

cargo run -p $APP_BINARY >$APP_BINARY.log 2>&1 &

APP_PID=$!
echo $APP_PID > $APP_BINARY.pid
echo "App $APP_BINARY started with PID: $APP_PID"
