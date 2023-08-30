#[macro_use]
extern crate diesel;

#[macro_use]
extern crate derive;

pub mod github_indexer;
pub mod listeners;
pub mod models;

mod config;
pub use config::Config;

pub const GITHUB_EVENTS_EXCHANGE: &str = "github-events";
