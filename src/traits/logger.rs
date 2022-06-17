use anyhow::Result;

pub trait SyncLogger<Item, Report> {
    fn log_sync(&self, item: &Item) -> Result<Report>;
}

impl<T, Item, Report> SyncLogger<Vec<Item>, Vec<Report>> for T
where
    T: SyncLogger<Item, Report>,
{
    fn log_sync(&self, items: &Vec<Item>) -> Result<Vec<Report>> {
        items.iter().map(|item| self.log_sync(item)).collect()
    }
}
