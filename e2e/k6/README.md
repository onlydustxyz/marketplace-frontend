# Load testing

We use K6 to perform load tests.

## Setup

Install k6: https://k6.io/docs/get-started/installation/

## Run tests

```sh
k6 run ./k6/unauthenticated_users.js
```

## Send metrics to Datadog

Install and setup your local Datadog agent. Set `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to true in the agent config.

Then, run the tests with:

```sh
K6_STATSD_ENABLE_TAGS=true k6 run --out statsd ./k6/unauthenticated_users.js
```
