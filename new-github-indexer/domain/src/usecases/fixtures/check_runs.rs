use rstest::fixture;

use crate::models::CheckRuns;

#[fixture]
pub fn x1257() -> CheckRuns {
	serde_json::from_slice(include_bytes!(
		"resources/marketplace-frontend_pulls_1257_checkruns"
	))
	.unwrap()
}
