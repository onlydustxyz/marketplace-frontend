use anyhow::Result;
use async_trait::async_trait;
use std::rc::Rc;
use std::sync::Arc;

#[async_trait]
pub trait AsyncFetcher<Filter, Item> {
    async fn fetch_async(&self, filter: Filter) -> Result<Box<dyn Iterator<Item = Item>>>;
}

pub trait SyncFetcher<Filter, Item> {
    fn fetch_sync(&self, filter: Filter) -> Result<Box<dyn Iterator<Item = Item>>>;
}

pub enum Fetcher<Filter, Item> {
    Sync(Rc<dyn SyncFetcher<Filter, Item>>),
    Async(Arc<dyn AsyncFetcher<Filter, Item>>),
}

impl<Filter, Item> Fetcher<Filter, Item> {
    pub async fn fetch(&self, filter: Filter) -> Result<Box<dyn Iterator<Item = Item>>> {
        match self {
            Self::Sync(fetcher) => fetcher.as_ref().fetch_sync(filter),
            Self::Async(fetcher) => fetcher.as_ref().fetch_async(filter).await,
        }
    }
}
