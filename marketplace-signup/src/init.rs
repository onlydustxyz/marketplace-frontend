use std::sync::Arc;

use dotenv::dotenv;

use crate::{
	application::registerer::{Registerer, RegistererImpl},
	config,
	infrastructure::{github_client::GitHubClient, starknet_client::StarkNetClient},
};

pub fn build_registerer() -> Arc<dyn Registerer<GitHubClient, StarkNetClient>> {
	info!("loading configuration...");
	dotenv().ok();
	let conf = config::load();
	info!("configuration loaded");

	let github_client = GitHubClient::new(
		conf.github_id,
		conf.github_secret,
		conf.access_token_url,
		conf.user_api_url,
	);
	let starknet_client = StarkNetClient::new(
		&conf.hex_account_address,
		&conf.hex_private_key,
		&conf.hex_badge_registry_address,
		conf.chain,
	);

	Arc::new(RegistererImpl::new(github_client, starknet_client))
}
