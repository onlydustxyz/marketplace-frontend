use super::Result;

pub trait Repository<Id> {
	fn list_items_to_index(&self) -> Result<Vec<Id>>;
}
