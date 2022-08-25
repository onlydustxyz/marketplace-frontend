#[macro_use]
extern crate diesel;

pub mod database;
pub mod github;
pub mod starknet;

use diesel_migrations::*;
#[macro_use]
extern crate diesel_migrations;

embed_migrations!("../migrations");
