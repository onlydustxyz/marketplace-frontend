use crate::{ContractAddress, GithubUserId, HexPrefixedString, ParseHexPrefixedStringError};
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Id(HexPrefixedString);

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Account(ContractAddress);

#[derive(Clone, Debug, PartialEq, Eq, Default)]
pub struct Contributor {
	pub id: Id,
	pub account: Account,
	pub github_identifier: GithubUserId,
}
