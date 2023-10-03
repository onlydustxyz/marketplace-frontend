use rstest::fixture;

use crate::models::pulls::PullRequest;

#[fixture]
pub fn x1257() -> PullRequest {
	serde_json::from_slice(include_bytes!(
		"resources/marketplace-frontend_pulls_1257.json"
	))
	.unwrap()
}
