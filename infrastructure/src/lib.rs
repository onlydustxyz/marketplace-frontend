#[macro_use]
extern crate diesel;

pub mod amqp;
pub mod database;
pub mod tracing;

pub mod event_bus;

use diesel_migrations::*;
#[macro_use]
extern crate diesel_migrations;

embed_migrations!("../migrations");
