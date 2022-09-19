use crate::infrastructure::starknet_client::StarkNetChain;

pub struct Configuration {
    pub github_id: String,
    pub github_secret: String,
    pub access_token_url: String,
    pub user_api_url: String,

    pub hex_account_address: String,
    pub hex_private_key: String,
    pub hex_badge_registry_address: String,
    pub chain: StarkNetChain,
}

pub fn load() -> Configuration {
    let github_id = std::env::var("GITHUB_ID").expect("GITHUB_ID environment variable must be set");
    let github_secret =
        std::env::var("GITHUB_SECRET").expect("GITHUB_SECRET environment variable must be set");
    let access_token_url = std::env::var("GITHUB_ACCESS_TOKEN_URL")
        .unwrap_or_else(|_| "https://github.com/login/oauth/access_token".to_string());
    let user_api_url = std::env::var("GITHUB_USER_API_URL")
        .unwrap_or_else(|_| "https://api.github.com/user".to_string());

    let hex_account_address = std::env::var("STARKNET_ACCOUNT")
        .expect("STARKNET_ACCOUNT environment variable must be set");
    let hex_private_key = std::env::var("STARKNET_PRIVATE_KEY")
        .expect("STARKNET_PRIVATE_KEY environment variable must be set");
    let hex_badge_registry_address = std::env::var("STARKNET_BADGE_REGISTRY_ADDRESS")
        .expect("STARKNET_BADGE_REGISTRY_ADDRESS environment variable must be set");
    let chain = std::env::var("STARKNET_CHAIN")
        .expect("STARKNET_CHAIN environment variable must be set to either 'MAINNET' or 'TESTNET'");
    let chain: StarkNetChain = chain
        .parse()
        .expect("STARKNET_CHAIN environment variable must be set to either 'MAINNET' or 'TESTNET'");

    Configuration {
        github_id,
        github_secret,
        access_token_url,
        user_api_url,
        hex_account_address,
        hex_private_key,
        hex_badge_registry_address,
        chain,
    }
}
