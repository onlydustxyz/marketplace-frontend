# api

This crate is the main crate of OnlyDust marketplace back-end.
It includes:

- The presentation layer (REST API)
- The application layer (use cases triggered by the application layer)
- End-to-end tests as a standalone binary

## Event sourcing sanity checks

To perform sanity checks on the event store, simply run the following command

```bash
cargo run -p api --bin events_sanity_checks
```

Or in staging/production:

```bash
heroky run -a od-api-staging events_sanity_checks
```
