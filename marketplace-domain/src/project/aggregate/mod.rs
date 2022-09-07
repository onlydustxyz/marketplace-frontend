use crate::*;
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};
use thiserror::Error;

mod event;
pub use event::Event;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Project;

impl Aggregate for Project {
	type Event = Event;
	type Id = GithubProjectId;
}
