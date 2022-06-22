use async_trait::async_trait;

pub trait SyncLogger<Item, Report> {
    fn log_sync(&self, item: Item) -> Report;
}

#[async_trait]
pub trait AsyncLogger<Item, Report> {
    async fn log_async(&self, item: Item) -> Report;
}

pub enum Logger<'a, Item, Report> {
    Sync(Box<&'a dyn SyncLogger<Item, Report>>),
    Async(Box<&'a dyn AsyncLogger<Item, Report>>),
}

impl<'a, Item, Report> Logger<'a, Item, Report> {
    pub fn new_sync(logger: &'a impl SyncLogger<Item, Report>) -> Self {
        Self::Sync(Box::new(logger))
    }

    pub fn new_async(logger: &'a impl AsyncLogger<Item, Report>) -> Self {
        Self::Async(Box::new(logger))
    }

    pub async fn log(&self, item: Item) -> Report {
        match self {
            Self::Sync(logger) => logger.as_ref().log_sync(item),
            Self::Async(logger) => logger.as_ref().log_async(item).await,
        }
    }
}
