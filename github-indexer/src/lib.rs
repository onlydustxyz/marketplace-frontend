#[macro_use]
extern crate diesel;

#[macro_use]
extern crate derive;

#[macro_use]
extern crate rocket;

pub mod domain;
pub mod models;
pub mod presentation;

mod config;
pub use config::Config;
