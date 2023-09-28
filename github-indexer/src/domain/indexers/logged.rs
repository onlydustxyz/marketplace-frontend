use std::{fmt, time::Instant};

use async_trait::async_trait;
use olog::{error, info, IntoField};

use super::{error::Result, Indexable, Indexer};

pub struct LoggerIndexer<I> {
	pub decorated: I,
}

#[async_trait]
impl<Id, I> Indexer<Id> for LoggerIndexer<I>
where
	Id: Indexable,
	I: Indexer<Id>,
{
	type Output = I::Output;

	async fn index(&self, id: &Id) -> Result<Self::Output> {
		let start = Instant::now();
		match self.decorated.index(id).await {
			Ok(output) => {
				info!(
					indexed_item_id = format!("{id:?}"),
					indexed_item_id_type = std::any::type_name::<Id>(),
					indexer_type = self.decorated.to_string(),
					duration = start.elapsed().as_secs(),
					"Successfully indexed item"
				);
				Ok(output)
			},
			Err(error) => {
				error!(
					error = error.to_field(),
					indexed_item_id = format!("{id:?}"),
					indexed_item_id_type = std::any::type_name::<Id>(),
					indexer_type = self.decorated.to_string(),
					"Failed to index item"
				);
				Err(error)
			},
		}
	}
}

impl<I: fmt::Display> fmt::Display for LoggerIndexer<I> {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}", self.decorated)
	}
}

pub trait Logged<I> {
	fn logged(self) -> LoggerIndexer<I>;
}

impl<I> Logged<I> for I {
	fn logged(self) -> LoggerIndexer<I> {
		LoggerIndexer { decorated: self }
	}
}
