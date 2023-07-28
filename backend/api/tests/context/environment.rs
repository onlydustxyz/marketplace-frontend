use std::ffi::OsString;

use envtestkit::{set_env, EnvironmentTestGuard};

pub struct Context {
	_guards: Vec<EnvironmentTestGuard>,
}

impl Context {
	pub fn new() -> Self {
		Self {
			_guards: vec![set_env(
				OsString::from("HASURA_GRAPHQL_JWT_SECRET"),
				r#"{"type":"HS256","key":"some-fake-secret-for-unittest","issuer":"hasura-auth-unit-tests"}"#,
			)],
		}
	}
}
