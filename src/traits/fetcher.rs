use anyhow::Result;
use async_trait::async_trait;

#[async_trait]
pub trait Fetcher<Filter, Item> {
    async fn fetch(&self, filter: Filter) -> Result<Vec<Item>>;
}

pub trait SyncFetcher<Filter, Item> {
    fn fetch_sync(&self, filter: Filter) -> Result<Vec<Item>>;
}
