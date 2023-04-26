#!/bin/bash

APP_NAME=$1

if [ -f "$APP_NAME.pid" ]; then \
    kill $(cat $APP_NAME.pid); \
    rm $APP_NAME.pid; \
    rm $APP_NAME.log; \
    echo "$APP_NAME stopped"; \
else \
    echo "$APP_NAME is not running"; \
fi
