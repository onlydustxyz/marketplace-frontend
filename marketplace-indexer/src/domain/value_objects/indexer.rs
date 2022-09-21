pub type Id = String;

#[derive(Clone)]
pub struct Indexer {
	pub id: Id,
	pub index_head: u64,
}

impl Indexer {
	pub fn new<ID: Into<Id>>(id: ID, index_head: u64) -> Self {
		Self {
			id: id.into(),
			index_head,
		}
	}
}
