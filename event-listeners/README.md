# api

This crate is the main crate of OnlyDust Market place back-end.
It includes:

- The presentation layer (REST API)
- The application layer (use cases triggered by the application layer)
- End-to-end tests as a standalone binary

## Refresh projections

To refresh any aggregate projections, simply run the following command:

```
cargo run -p event-listeners --bin refresh -- --name <Project> <--id <Aggregate ID>|--all>
```

Examples:

```
cargo run -p event-listeners --bin refresh -- --name Project --id 22a942c6-d07c-4d0e-903e-49cf8a660643
cargo run -p event-listeners --bin refresh -- --name Project --all
```

Or in staging/production:

```bash
heroky run -a od-api-event-listeners refresh --name Project --id 22a942c6-d07c-4d0e-903e-49cf8a660643
heroky run -a od-api-event-listeners refresh --name Project --all
```
