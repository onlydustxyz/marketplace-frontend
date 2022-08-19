use super::ContractError;
use starknet::{
	core::{types::FieldElement, utils::get_selector_from_name},
	providers::jsonrpc::{
		models::{BlockHashOrTag, BlockTag, FunctionCall},
		HttpTransport, JsonRpcClient,
	},
};
use url::Url;

pub struct ContractViewer {
	contract_address: FieldElement,
	client: JsonRpcClient<HttpTransport>,
}

impl ContractViewer {
	pub fn new(contract_address: FieldElement) -> Self {
		Self {
			contract_address,
			client: JsonRpcClient::new(HttpTransport::new(json_rpc_uri())),
		}
	}

	pub async fn call(
		&self,
		function_name: &str,
		calldata: Vec<FieldElement>,
	) -> Result<Vec<FieldElement>, ContractError> {
		self.client
			.call(
				&FunctionCall {
					contract_address: self.contract_address,
					entry_point_selector: get_selector_from_name(function_name).unwrap(),
					calldata,
				},
				&BlockHashOrTag::Tag(BlockTag::Latest),
			)
			.await
			.map_err(|e| ContractError::Call(e.to_string()))
	}
}

fn json_rpc_uri() -> Url {
	Url::parse(&std::env::var("JSON_RPC_URI").expect("JSON_RPC_URI must be set"))
		.expect("Invalid JSON_RPC_URI")
}
