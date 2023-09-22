use rocket::figment::{
	providers::{Env, Format, Toml},
	Figment,
};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize, Default)]
pub struct Config {
	pub api_keys: Vec<String>,
}

pub fn rocket(file_path: &str) -> Figment {
	Figment::from(rocket::Config::default())
		.merge(Toml::file(file_path).nested())
		.merge(Env::prefixed("ROCKET_").global())
}
