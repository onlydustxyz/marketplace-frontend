use derive_getters::Getters;
use rocket::figment::{
	providers::{Env, Format, Toml},
	Figment,
};
use serde::Deserialize;

#[derive(Clone, Deserialize, Getters)]
pub struct Config {
	api_key: String,
}

pub fn rocket(file_path: &str) -> Figment {
	Figment::from(rocket::Config::default())
		.merge(Toml::file(file_path).nested())
		.merge(Env::prefixed("ROCKET_").global())
}
