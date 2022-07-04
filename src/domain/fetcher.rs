use anyhow::Result;
use async_trait::async_trait;

use crate::utils::stream::Streamable;

pub type FetchResult<'a, Item> = Result<Streamable<'a, Item>>;

#[async_trait]
pub trait Fetcher<Filter, Item> {
    async fn fetch(&self, filter: Filter) -> FetchResult<Item>;
}
