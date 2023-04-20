#[macro_use]
extern crate rocket;

pub mod presentation;

mod config;
pub use config::Config;

mod domain;
mod infrastructure;

pub use crate::domain::{Action, GithubService};

pub static DUSTY_BOT_ACTION_QUEUE: &str = "dusty-bot-actions";
