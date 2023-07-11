use testcontainers::{core::WaitFor, images::generic::GenericImage};

pub struct IntegrationTestSetup {}

impl IntegrationTestSetup {
	pub fn init() -> GenericImage {
		GenericImage::new("postgres", "13")
			.with_env_var("POSTGRES_DB".to_string(), "od-rust-template".to_string())
			.with_env_var("POSTGRES_USER".to_string(), "postgres".to_string())
			.with_env_var("POSTGRES_PASSWORD".to_string(), "Passw0rd".to_string())
			.with_env_var("POSTGRES_HOST_AUTH_METHOD".to_string(), "trust".to_string())
			.with_wait_for(WaitFor::StdOutMessage {
				message: "database system is ready to accept connections".to_string(),
			})
	}
}
