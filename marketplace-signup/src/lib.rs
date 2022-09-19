#[macro_use]
extern crate rocket;
extern crate dotenv;

mod application;
mod config;
mod infrastructure;

pub mod domain;
pub mod init;
pub mod routes;
