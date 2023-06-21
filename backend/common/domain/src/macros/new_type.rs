#[macro_export]
macro_rules! create_new_type {
	($name:ident, $underlying_type:ty) => {
		#[derive(
			Debug,
			Clone,
			Copy,
			Default,
			PartialEq,
			Eq,
			Hash,
			serde::Serialize,
			serde::Deserialize,
			derive_more::Display,
			derive_more::From,
			derive_more::Into,
			derive_more::AsRef,
			derive_more::FromStr,
			diesel_derive_newtype::DieselNewType,
		)]
		pub struct $name($underlying_type);
	};

	($name:ident, $underlying_type:ty, $init:expr) => {
		$crate::create_new_type!($name, $underlying_type);

		impl $name {
			pub fn new() -> Self {
				Self($init)
			}
		}
	};
}

#[macro_export]
macro_rules! create_new_id {
	($name:ident) => {
		$crate::create_new_type!($name, uuid::Uuid, uuid::Uuid::new_v4());

		impl From<uuid08::Uuid> for $name {
			fn from(id: uuid08::Uuid) -> Self {
				Self(uuid::Uuid::from_bytes(*id.as_bytes()))
			}
		}

		impl From<$name> for uuid08::Uuid {
			fn from(id: $name) -> Self {
				uuid08::Uuid::from_bytes(*id.0.as_bytes())
			}
		}
	};
}
