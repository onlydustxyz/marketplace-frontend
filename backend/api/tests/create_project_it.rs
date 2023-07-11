#[cfg(test)]
mod tests {
	use rocket::local::blocking::Client;
	use api::Config;
	use api::presentation::bootstrap::bootstrap;
	use presentation::http::config;

	#[actix_rt::test]
	pub async fn should_create_project() {
		let config: Config = config::load("backend/api/app.yaml")?;
		let rocket_builder = bootstrap(config).await?;

		let client = Client::tracked(rocket_builder).expect("valid rocket instance");
	}
}
