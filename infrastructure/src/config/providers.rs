use derive_more::Constructor;
use figment::{
	value::{Dict, Map, Value},
	Error, Metadata, Profile, Provider,
};

#[derive(Constructor)]
pub struct Enhanced<P: Provider>(P);

impl<P: Provider> Provider for Enhanced<P> {
	fn metadata(&self) -> Metadata {
		self.0.metadata()
	}

	fn data(&self) -> Result<Map<Profile, Dict>, Error> {
		Ok(self.0.data()?.try_from_env())
	}
}

trait TryFromEnv {
	fn try_from_env(self) -> Self;
}

impl<K: Ord, V: TryFromEnv> TryFromEnv for Map<K, V> {
	fn try_from_env(self) -> Self {
		self.into_iter().map(|(key, value)| (key, value.try_from_env())).collect()
	}
}

impl TryFromEnv for Value {
	fn try_from_env(self) -> Self {
		match self {
			Self::String(tag, value) => Self::String(tag, value.try_from_env()),
			Self::Dict(tag, value) => Self::Dict(tag, value.try_from_env()),
			Self::Array(tag, value) => Self::Array(tag, value.try_from_env()),
			_ => self,
		}
	}
}

impl TryFromEnv for Vec<Value> {
	fn try_from_env(self) -> Self {
		self.into_iter().map(|value| value.try_from_env()).collect()
	}
}

impl TryFromEnv for String {
	fn try_from_env(self) -> Self {
		if let Some(variable) = self.strip_prefix('$') {
			std::env::var(variable).unwrap_or(self)
		} else {
			self
		}
	}
}
