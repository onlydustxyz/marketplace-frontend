use derive_more::Constructor;
use figment::{
	value::{Dict, Map, Value},
	Error, Metadata, Profile, Provider,
};

#[derive(Constructor)]
pub struct ExpandWithEnv<P: Provider>(P);

impl<P: Provider> Provider for ExpandWithEnv<P> {
	fn metadata(&self) -> Metadata {
		self.0.metadata()
	}

	fn data(&self) -> Result<Map<Profile, Dict>, Error> {
		Ok(self.0.data()?.try_from_env().unwrap_or_default())
	}
}

trait TryFromEnv
where
	Self: Sized,
{
	fn try_from_env(self) -> Option<Self>;
}

impl<K: Ord, V: TryFromEnv> TryFromEnv for Map<K, V> {
	fn try_from_env(self) -> Option<Self> {
		Some(
			self.into_iter()
				.filter_map(|(key, value)| value.try_from_env().map(|value| (key, value)))
				.collect(),
		)
	}
}

impl TryFromEnv for Value {
	fn try_from_env(self) -> Option<Self> {
		match self {
			Self::String(tag, value) => value.try_from_env().map(|value| Self::String(tag, value)),
			Self::Dict(tag, value) => value.try_from_env().map(|value| Self::Dict(tag, value)),
			Self::Array(tag, value) => value.try_from_env().map(|value| Self::Array(tag, value)),
			_ => Some(self),
		}
	}
}

impl TryFromEnv for Vec<Value> {
	fn try_from_env(self) -> Option<Self> {
		Some(self.into_iter().filter_map(|value| value.try_from_env()).collect())
	}
}

impl TryFromEnv for String {
	fn try_from_env(self) -> Option<Self> {
		if let Some(variable) = self.strip_prefix('$') {
			std::env::var(variable).ok()
		} else {
			Some(self)
		}
	}
}
