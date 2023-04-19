#[macro_use]
extern crate rocket;

pub mod presentation;

mod config;
pub use config::Config;

mod domain;
mod infrastructure;
