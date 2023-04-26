#!/bin/bash

PORT=$1

echo "Waiting for some app to listen to port $PORT..."

while ! nc -z localhost $PORT >/dev/null 2>&1; do
  sleep 1
done

echo "Some app is now listening to port $PORT"
