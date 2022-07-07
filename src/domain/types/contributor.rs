use crypto_bigint::U256;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug)]
pub struct ContributorId(pub U256);

impl Serialize for ContributorId {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.0.serialize(serializer)
    }
}

impl<'de> Deserialize<'de> for ContributorId {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        Ok(Self(U256::deserialize(deserializer)?))
    }
}
