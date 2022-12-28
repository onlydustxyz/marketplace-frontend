use derive_more::Constructor;
use figment::{
	value::{Dict, Map, Value},
	Error, Metadata, Profile, Provider,
};
use regex::Regex;

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
	fn try_from_env(mut self) -> Option<Self> {
		lazy_static! {
			// retrieve all occurences of pattern like $VAR_NAME
			static ref RE: Regex = Regex::new(r"(?:\$)(?P<var>[[:alpha:]_]+)").unwrap();
		}

		while let Some(captures) = RE.captures(&self) {
			self.replace_range(
				captures.get(0).unwrap().range(),
				&captures.get(1).and_then(|var| std::env::var(var.as_str()).ok())?,
			)
		}
		Some(self)
	}
}
