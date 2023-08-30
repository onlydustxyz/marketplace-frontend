pub use http::Config;
use presentation::http;
use rocket::{Build, Rocket};

pub fn serve(config: Config) -> Rocket<Build> {
	rocket::custom(http::config::rocket("backend/event-listeners/Rocket.toml"))
		.manage(config)
		.attach(http::guards::Cors)
}
