use std::{collections::HashMap, sync::Arc};

use anyhow::{anyhow, Result};

/// `Registry` is a type alias of a `HashMap` that maps a `String` key to an
/// `Arc` that contains a trait object of type `dyn Refreshable`.
pub type Registry = HashMap<String, Arc<dyn Refreshable>>;

/// The `Registrable` trait defines an interface for registering types
/// that implement the `Refreshable` trait into a `Registry`.
pub trait Registrable {
    /// Registers a type that implements the `Refreshable` trait into the given
    /// `registry` under the specified `key`.
    ///
    /// # Arguments
    ///
    /// * `self` - the value to be registered
    /// * `registry` - a mutable reference to the registry to insert the value into
    /// * `key` - the key to insert the value under
    ///
    /// # Errors
    ///
    /// Returns an `Err` containing an `anyhow` error with the message "Refresher
    /// already exists" if a value with the specified `key` already exists in the registry.
    ///
    /// # Examples
    ///
    /// ```
    /// use my_crate::{Registrable, Registry, MyRefreshableType};
    ///
    /// let mut registry = Registry::new();
    ///
    /// let my_refreshable = MyRefreshableType::new();
    ///
    /// my_refreshable.register(&mut registry, "my_key").unwrap();
    /// assert!(registry.contains_key("my_key"));
    /// ```
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