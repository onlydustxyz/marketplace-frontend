mod adapters;
mod error;

use std::fmt::Debug;

use octocrab_indexer::{self, FromResponse, Octocrab};

pub struct Client {
	octocrab: Octocrab,
}

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Octocrab(#[from] octocrab_indexer::Error),
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
}
