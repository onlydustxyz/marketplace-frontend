pub mod contributors;
pub mod cors;
mod dto;
pub mod graphql;
pub mod health;

pub use dto::*;

use rocket_okapi::swagger_ui::SwaggerUIConfig;

pub(crate) fn get_docs() -> SwaggerUIConfig {
	SwaggerUIConfig {
		url: "/openapi.json".to_string(),
		..Default::default()
	}
}
