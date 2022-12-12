extern crate dotenv;

mod application;
pub mod domain;
pub mod infrastructure;
pub mod presentation;

mod config;
pub use config::Config;

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate derive_new;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate derive;
