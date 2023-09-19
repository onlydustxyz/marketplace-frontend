#![allow(unused)]

pub mod closing_issues;
pub mod commits;
pub mod issues;
pub mod projects;
pub mod pull_requests;
pub mod repos;
pub mod reviews;
pub mod users;

use rocket::http::Header;

use crate::context::API_KEY;

pub fn api_key_header() -> Header<'static> {
	Header::new("Api-Key", API_KEY)
}
