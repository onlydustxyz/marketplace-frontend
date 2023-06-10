use anyhow::Result;

use crate::*;

pub trait Repository: Send + Sync {
	fn find_by_id_or_default(&self, id: &CommandId) -> Result<Command>;

	fn upsert(&self, command: Command) -> Result<()>;

	fn decrease_processing_count(&self, id: &CommandId, amount: i32) -> Result<()>;
}
