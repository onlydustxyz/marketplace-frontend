mod applications;
mod contributions;
pub mod contributors;
pub mod cors;
mod dto;
pub mod graphql;
pub mod health;
mod projects;

pub use applications::*;
pub use contributions::*;
pub use dto::*;
pub use projects::{refresh::*, *};

use rocket_okapi::swagger_ui::SwaggerUIConfig;

pub(crate) fn get_docs() -> SwaggerUIConfig {
	SwaggerUIConfig {
		url: "/openapi.json".to_string(),
		..Default::default()
	}
}
