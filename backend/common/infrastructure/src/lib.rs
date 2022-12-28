#[macro_use]
extern crate diesel;

pub mod amqp;
pub mod config;
pub mod database;
pub mod event_bus;
pub mod event_store;
pub mod github;
pub mod tracing;
pub mod web3;

use diesel_migrations::*;
#[macro_use]
extern crate diesel_migrations;

embed_migrations!("../../../migrations");
