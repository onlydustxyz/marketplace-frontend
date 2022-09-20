pub use super::Account as ContributorAccount;
use crate::{GithubUserId, HexPrefixedString, ParseHexPrefixedStringError};
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Id(HexPrefixedString);

#[derive(Clone, Debug, PartialEq, Eq, Default)]
pub struct Contributor {
	pub id: Id,
	pub account: ContributorAccount,
	pub github_identifier: GithubUserId,
}
