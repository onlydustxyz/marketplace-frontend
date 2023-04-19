use std::sync::Arc;

use derive_new::new;

use crate::domain::GithubService;

#[derive(Clone, new)]
pub struct Context {
	pub github_service: Arc<dyn GithubService>,
}

impl juniper::Context for Context {}
