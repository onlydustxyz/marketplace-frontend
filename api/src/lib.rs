extern crate dotenv;

mod application;
pub mod domain;
pub mod graphql;
pub mod infrastructure;
pub mod routes;

mod config;
pub use config::Config;

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate derive_new;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate macros;
