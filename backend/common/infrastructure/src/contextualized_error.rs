use std::fmt::Display;

use derive_new::new;
use thiserror::Error;

#[derive(Error, Debug, new)]
pub struct ContextualizedError<E: std::error::Error> {
	context: String,
	#[source] // optional if field name is `source`
	source: E,
}

impl<E: std::error::Error> Display for ContextualizedError<E> {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		f.write_fmt(format_args!("{} ({})", self.source, self.context))
	}
}

pub trait IntoContextualizedError<T, E: std::error::Error, C: Into<String>> {
	fn err_with_context(self, context: C) -> std::result::Result<T, ContextualizedError<E>>;
}

impl<T, E: std::error::Error, C: Into<String>> IntoContextualizedError<T, E, C>
	for std::result::Result<T, E>
{
	fn err_with_context(self, context: C) -> std::result::Result<T, ContextualizedError<E>> {
		match self {
			Ok(t) => Ok(t),
			Err(e) => Err(ContextualizedError {
				context: context.into(),
				source: e,
			}),
		}
	}
}
