use rstest::fixture;

use crate::models::issues::Issue;

#[fixture]
pub fn x78() -> Issue {
	serde_json::from_slice(include_bytes!(
		"resources/marketplace-frontend_issue_78.json"
	))
	.unwrap()
}
