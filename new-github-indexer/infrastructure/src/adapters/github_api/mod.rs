mod error;
mod raw_storage_adapter;

use std::fmt::Debug;

use octocrab_indexer::{self, FromResponse, Octocrab};

pub struct Client {
	octocrab: Octocrab,
}

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Octocrab(#[from] octocrab_indexer::Error),
	#[error("Provided URI is invalid")]
	InvalidUri,
}

type Result<T> = std::result::Result<T, Error>;

impl Client {
	pub async fn get_as<U, R>(&self, route: U) -> Result<R>
	where
		U: AsRef<str> + Debug + Send,
		R: FromResponse,
	{
		let response = self.octocrab.get(route, None::<&()>).await?;
		Ok(response)
	}

	pub async fn get_all_as<U, R>(&self, route: U) -> Result<Vec<R>>
	where
		U: AsRef<str> + Debug + Send,
		for<'de> R: serde::de::Deserialize<'de>,
	{
		let page = self.octocrab.get_page::<R>(&route.as_ref().parse().ok()).await?;
		match page {
			Some(page) => self.octocrab.all_pages(page).await.map_err(Into::into),
			None => Ok(vec![]),
		}
	}
}
