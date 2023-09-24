# api

This crate is the main crate of OnlyDust marketplace back-end.
It includes:

-   The presentation layer (REST API)
-   The application layer (use cases triggered by the application layer)
-   End-to-end tests as a standalone binary

## Event sourcing sanity checks

To perform sanity checks on the event store, simply run the following command

```bash
cargo run -p api --bin events_sanity_checks
```

Or in staging/production:

```bash
heroky run -a od-api-staging events_sanity_checks
```

## Crypto currency price synchronization

We use Coinmarketcap API to fetch crypto currencies related information like USD price.

The API is rate limited:

**Startup Plan**

-   Monthly credit limit: 300 000 (soft cap)
-   Historical data access: Up to 1 month historical data
-   Daily Historical data access: Up to 24 months historical data
-   API call rate limit: 30 requests a minute
-   Endpoints enabled: 28
-   Currency conversions: Limit 40 per request
-   License: Commercial use

To run the daemon that fetch prices on a regular basis:

```bash
cargo run -p api --bin quotes_syncer
```
