use std::fmt::Display;

use okapi::openapi3::SchemaObject;
use rocket::serde::{de, Deserialize, Serialize, Serializer};
use schemars::schema::InstanceType;
use starknet::core::types::FieldElement;

#[derive(Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash)]
pub struct HexFieldElement(FieldElement);

impl schemars::JsonSchema for HexFieldElement {
    fn schema_name() -> String {
        "HexFieldElement".to_string()
    }

    fn json_schema(_gen: &mut schemars::gen::SchemaGenerator) -> schemars::schema::Schema {
        let schema = SchemaObject {
            instance_type: Some(InstanceType::String.into()),
            format: Some("hexadecimal".to_string()),

            ..Default::default()
        };
        schema.into()
    }
}

impl Serialize for HexFieldElement {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&format!("{:#x}", &self.0))
    }
}

impl<'de> Deserialize<'de> for HexFieldElement {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: rocket::serde::Deserializer<'de>,
    {
        let value = String::deserialize(deserializer)?;
        match FieldElement::from_hex_be(&value) {
            Ok(value) => Ok(HexFieldElement(value)),
            Err(err) => Err(de::Error::custom(format!("invalid hex string: {}", err))),
        }
    }
}

impl From<FieldElement> for HexFieldElement {
    fn from(value: FieldElement) -> Self {
        HexFieldElement(value)
    }
}

impl From<HexFieldElement> for FieldElement {
    fn from(value: HexFieldElement) -> Self {
        value.0
    }
}

impl Display for HexFieldElement {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:#x}", self.0)
    }
}
