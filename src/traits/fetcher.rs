use anyhow::Result;
use async_trait::async_trait;

use super::Streamable;

pub type FetchResult<'a, Item> = Result<Streamable<'a, Item>>;

#[async_trait(?Send)]
pub trait Fetcher<Filter, Item> {
    async fn fetch(&self, filter: Filter) -> FetchResult<Item>;
}
