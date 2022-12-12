#[macro_use]
extern crate diesel;

#[macro_use]
extern crate derive;

#[macro_use]
extern crate derive_new;

pub mod domain;
pub mod infrastructure;
pub mod presentation;

mod config;
pub use config::Config;
