use crate::utils::stream::{Streamable, StreamableResult};
use anyhow::Result;
use async_trait::async_trait;

#[async_trait]
pub trait Logger<Item, Report> {
    async fn log(&self, item: Item) -> Result<Report>;
}

#[async_trait]
pub trait StreamLogger<Item, Report> {
    async fn log(
        &self,
        items: Streamable<'life0, Item>,
    ) -> Result<StreamableResult<'life0, Report>>;
}
