use async_trait::async_trait;

#[async_trait(?Send)]
pub trait Logger<Item, Report> {
    async fn log(&self, item: Item) -> Report;
}
