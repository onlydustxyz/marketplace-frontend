use rstest::fixture;

use crate::models::*;

#[fixture]
pub fn marketplace_frontend() -> Repository {
	serde_json::from_slice(include_bytes!("resources/marketplace-frontend.json")).unwrap()
}
