use crate::e2e_tests::{
	http::{self, BACKEND_BASE_URI},
	starknet::Account,
};
use reqwest::StatusCode;
use serde_json::json;
use starknet::{core::crypto::compute_hash_on_elements, signers::Signer};

pub async fn signup(contributor_account: &Account) {
	let address = contributor_account.address();
	let hash = compute_hash_on_elements(&[address]);
	let signature = contributor_account
		.signer()
		.sign_hash(&hash)
		.await
		.expect("Should return a valid signature");

	let response = http::put(
		format!("{BACKEND_BASE_URI}/contributors/{address:#x}/github"),
		Some(json!({
			"authorization_code": "0x1234",
			"signed_data": {
				"hash": format!("{:#x}", hash),
				"signature": {
						"r": format!("{:#x}", signature.r),
						"s": format!("{:#x}", signature.s),
				},
			},
		})),
	)
	.await;

	assert_eq!(
		response.status(),
		StatusCode::NO_CONTENT,
		"Invalid response received from GET"
	);
}
