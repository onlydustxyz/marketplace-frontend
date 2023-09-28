use std::{fmt, marker::PhantomData, sync::Arc};

use async_trait::async_trait;
use olog::info;

use super::{error::Result, Indexable};
use crate::models::IdentifiableRepository;

pub struct Indexer<Id, I, M>
where
	Id: Indexable,
	I: super::Indexer<Id>,
{
	pub decorated: I,
	repository: Arc<dyn IdentifiableRepository<M, Id>>,
	pub _phantom: PhantomData<Id>,
}

pub enum Output<C, F> {
	Cached(C),
	Fresh(F),
}

#[async_trait]
impl<Id, I, M> super::Indexer<Id> for Indexer<Id, I, M>
where
	Id: Indexable,
	I: super::Indexer<Id>,
	M: Send,
{
	type Output = Output<M, I::Output>;

	async fn index(&self, id: &Id) -> Result<Self::Output> {
		match self.repository.find(id.clone())? {
			Some(model) => {
				info!(
					indexed_item_id = format!("{id:?}"),
					indexed_item_id_type = std::any::type_name::<Id>(),
					indexer_type = self.decorated.to_string(),
					"Item already indexed"
				);
				Ok(Output::Cached(model))
			},
			None => {
				let data = self.decorated.index(id).await?;
				Ok(Output::Fresh(data))
			},
		}
	}
}

impl<Id, I, M> fmt::Display for Indexer<Id, I, M>
where
	Id: Indexable,
	I: super::Indexer<Id>,
{
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}", self.decorated)
	}
}

pub trait Optional<Id, I, M>
where
	Id: Indexable,
	I: super::Indexer<Id>,
{
	fn optional(self, repository: Arc<dyn IdentifiableRepository<M, Id>>) -> Indexer<Id, I, M>;
}

impl<Id, I, M> Optional<Id, I, M> for I
where
	Id: Indexable,
	I: super::Indexer<Id>,
{
	fn optional(self, repository: Arc<dyn IdentifiableRepository<M, Id>>) -> Indexer<Id, I, M> {
		Indexer {
			decorated: self,
			repository,
			_phantom: Default::default(),
		}
	}
}
