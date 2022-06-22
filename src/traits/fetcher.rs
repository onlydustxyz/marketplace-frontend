use anyhow::Result;
use async_trait::async_trait;

#[async_trait]
pub trait AsyncFetcher<Filter, Item> {
    async fn fetch_async(&self, filter: Filter) -> Result<Box<dyn Iterator<Item = Item>>>;
}

pub trait SyncFetcher<Filter, Item> {
    fn fetch_sync(&self, filter: Filter) -> Result<Box<dyn Iterator<Item = Item>>>;
}

pub enum Fetcher<'a, Filter, Item> {
    Sync(Box<&'a dyn SyncFetcher<Filter, Item>>),
    Async(Box<&'a dyn AsyncFetcher<Filter, Item>>),
}

impl<'a, Filter, Item> Fetcher<'a, Filter, Item> {
    pub fn new_sync(fetcher: &'a impl SyncFetcher<Filter, Item>) -> Self {
        Self::Sync(Box::new(fetcher))
    }

    pub fn new_async(fetcher: &'a impl AsyncFetcher<Filter, Item>) -> Self {
        Self::Async(Box::new(fetcher))
    }

    pub async fn fetch(&self, filter: Filter) -> Result<Box<dyn Iterator<Item = Item>>> {
        match self {
            Self::Sync(fetcher) => fetcher.as_ref().fetch_sync(filter),
            Self::Async(fetcher) => fetcher.as_ref().fetch_async(filter).await,
        }
    }
}
