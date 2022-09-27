#[macro_use]
extern crate diesel;

pub mod database;
pub mod event_webhook;
pub mod github;
pub mod logger;
pub mod starknet_account_verifier;

use diesel_migrations::*;
#[macro_use]
extern crate diesel_migrations;

embed_migrations!("../migrations");
