use std::sync::Arc;

use crate::domain::GithubService;

pub struct Context {
	pub github_service: Arc<dyn GithubService>,
}

impl Context {
	pub fn new(github_service: Arc<dyn GithubService>) -> Self {
		Self { github_service }
	}
}

impl juniper::Context for Context {}
