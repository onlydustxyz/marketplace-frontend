use rstest::*;
use starknet::{
	accounts::SingleOwnerAccount,
	core::{chain_id, types::FieldElement},
	providers::SequencerGatewayProvider,
	signers::{LocalWallet, SigningKey},
};

pub type Account = SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>;

#[fixture]
pub fn accounts() -> [Account; 10] {
	// Taken from starknet-devnet run with `--seed 0`
	[
		make_account(
			"0xe3e70682c2094cac629f6fbed82c07cd",
			"0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
		),
		make_account(
			"0xf728b4fa42485e3a0a5d2f346baa9455",
			"0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79",
		),
		make_account(
			"0xeb1167b367a9c3787c65c1e582e2e662",
			"0x7447084f620ba316a42c72ca5b8eefb3fe9a05ca5fe6430c65a69ecc4349b3b",
		),
		make_account(
			"0xf7c1bd874da5e709d4713d60c8a70639",
			"0x3cad9a072d3cf29729ab2fad2e08972b8cfde01d4979083fb6d15e8e66f8ab1",
		),
		make_account(
			"0xe443df789558867f5ba91faf7a024204",
			"0x7f14339f5d364946ae5e27eccbf60757a5c496bf45baf35ddf2ad30b583541a",
		),
		make_account(
			"0x23a7711a8133287637ebdcd9e87a1613",
			"0x27d32a3033df4277caa9e9396100b7ca8c66a4ef8ea5f6765b91a7c17f0109c",
		),
		make_account(
			"0x1846d424c17c627923c6612f48268673",
			"0x19299c32cf2dcf9432a13c0cee07077d711faadd08f59049ca602e070c9ebb",
		),
		make_account(
			"0xfcbd04c340212ef7cca5a5a19e4d6e3c",
			"0x1d07131135aeb92eea44a341d94a01161edb1adab4c98ac56523d24e00183aa",
		),
		make_account(
			"0xb4862b21fb97d43588561712e8e5216a",
			"0x53c615080d35defd55569488bc48c1a91d82f2d2ce6199463e095b4a4ead551",
		),
		make_account(
			"0x259f4329e6f4590b9a164106cf6a659e",
			"0x7f61fa3893ad0637b2ff76fed23ebbb91835aacd4f743c2347716f856438429",
		),
	]
}

fn make_account(
	private_key: &str,
	account_address: &str,
) -> SingleOwnerAccount<SequencerGatewayProvider, LocalWallet> {
	let signer = LocalWallet::from(SigningKey::from_secret_scalar(
		FieldElement::from_hex_be(private_key).unwrap(),
	));

	use super::local_sequencer;
	SingleOwnerAccount::new(
		local_sequencer(),
		signer,
		FieldElement::from_hex_be(account_address).unwrap(),
		chain_id::TESTNET,
	)
}
