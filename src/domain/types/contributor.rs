use crypto_bigint::U256;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq)]
pub struct Id(pub U256);

#[derive(Clone, Debug)]
pub struct Contributor {
    pub id: Id,
    pub github_username: Option<String>,
    pub github_handle: Option<String>,
}

impl Serialize for Id {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        self.0.serialize(serializer)
    }
}

impl<'de> Deserialize<'de> for Id {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        Ok(Self(U256::deserialize(deserializer)?))
    }
}

impl ToString for Id {
    fn to_string(&self) -> String {
        self.0.to_string()
    }
}

impl From<String> for Id {
    fn from(s: String) -> Self {
        Self(U256::from_be_hex(&s))
    }
}
