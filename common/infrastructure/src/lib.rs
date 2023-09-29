#[macro_use]
extern crate diesel;

pub mod amqp;
pub mod coinmarketcap;
pub mod config;
pub mod contextualized_error;
pub mod database;
pub mod dbclient;
pub mod event_bus;
pub mod event_store;
pub mod github;
pub mod graphql;
pub mod http;
pub mod tracing;
pub mod web3;

extern crate diesel_migrations;
#[macro_use]
extern crate lazy_static;
