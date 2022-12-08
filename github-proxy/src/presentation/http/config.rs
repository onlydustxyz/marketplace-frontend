use figment::{
	providers::{Env, Format, Toml},
	Figment,
};

pub fn get() -> Figment {
	Figment::from(rocket::Config::default())
		.merge(Toml::file("github-proxy/Rocket.toml").nested())
		.merge(Env::prefixed("ROCKET_").global())
}
