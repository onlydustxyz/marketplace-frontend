use anyhow::{anyhow, Error};
use rocket::{http::Status, request::Outcome, Orbit, Rocket};

mod budget;
mod dusty_bot;
mod payment;
mod project;
mod sponsor;
mod user;

trait FromRocketState
where
	Self: Sized,
{
	fn from_state(rocket: &Rocket<Orbit>) -> Outcome<Self, Error>;
}

impl<T: Clone + Send + Sync + 'static> FromRocketState for T {
	fn from_state(rocket: &Rocket<Orbit>) -> Outcome<Self, Error> {
		match rocket.state::<Self>() {
			Some(item) => Outcome::Success(item.clone()),
			None => Outcome::Failure((
				Status::InternalServerError,
				anyhow!("Missing {}", std::any::type_name::<Self>()),
			)),
		}
	}
}
