use std::{collections::HashMap, sync::Arc};

use anyhow::{anyhow, Result};

use super::Refreshable;

pub type Registry = HashMap<String, Arc<dyn Refreshable>>;

pub trait Registrable {
	fn register(self, registry: &mut Registry, key: &'static str) -> Result<()>;
}

impl<R: Refreshable + 'static> Registrable for R {
	fn register(self, registry: &mut Registry, key: &'static str) -> Result<()> {
		if registry.insert(key.to_string(), Arc::new(self)).is_some() {
			return Err(anyhow!("Refresher already exists"))?;
		}

		Ok(())
	}
}
