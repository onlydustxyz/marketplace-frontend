use marketplace_domain::HexPrefixedString;
use okapi::openapi3::SchemaObject;
use schemars::{
	schema::{InstanceType, StringValidation},
	JsonSchema,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash)]
pub struct HexPrefixedStringDto(HexPrefixedString);

impl From<HexPrefixedStringDto> for HexPrefixedString {
	fn from(value: HexPrefixedStringDto) -> Self {
		value.0
	}
}

impl JsonSchema for HexPrefixedStringDto {
	fn schema_name() -> String {
		"HexPrefixedString".to_string()
	}

	fn json_schema(_: &mut schemars::gen::SchemaGenerator) -> schemars::schema::Schema {
		let schema = SchemaObject {
			instance_type: Some(InstanceType::String.into()),
			string: Some(Box::new(StringValidation {
				min_length: Some(3),
				max_length: Some(66),
				pattern: Some("\\b0x[0-9a-f]+\\b".to_string()),
			})),
			..Default::default()
		};

		schema.into()
	}
}
