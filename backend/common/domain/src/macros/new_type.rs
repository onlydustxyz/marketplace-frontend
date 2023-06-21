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
