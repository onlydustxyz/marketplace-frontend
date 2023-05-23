use std::sync::Arc;

use derive_more::Constructor;
use diesel::{ExpressionMethods, RunQueryDsl};
use domain::PaymentId;
use infrastructure::database::{schema::work_items::dsl, Client, DatabaseError};

use crate::domain::WorkItem;

/// A repository for WorkItem entities
#[derive(Constructor)]
pub struct Repository(
    /// A thread-safe reference-counting pointer to a database client
    Arc<Client>
);

impl Repository {
    /// Insert or update a work item in the database
	///
	/// # Arguments
	///
	/// * `work_item` - the WorkItem entity to be inserted or updated in the database
	///
	/// # Returns
	///
	/// Returns `Ok(())` if the operation succeeded
	///
	/// Returns an error of type `DatabaseError` if the operation failed
	///
	/// # Examples
	///
	/// ```rust
    /// # use std::sync::Arc;
    /// # use diesel::prelude::*;
    /// # use infrastructure::database::{Client, DatabaseError};
    /// # use domain::PaymentId;
	/// # use crate::domain::WorkItem;
    /// # use super::Repository;
    /// #
    /// # let connection = Client::new().connection().unwrap();
    /// # diesel::delete(dsl::work_items).execute(&connection).unwrap();
    /// #
	/// let payment_id = PaymentId::new();
	/// let work_item = WorkItem::new(payment_id, "test/repo".to_owned(), 123);
	/// let repository = Repository(Arc::new(Client::new()));
	/// let result = repository.upsert(&work_item);
	/// assert!(result.is_ok());
	/// # let result = repository.delete_by_payment_id(&payment_id);
    /// # assert!(result.is_ok());
	/// ```
    #[tracing::instrument(skip(self, work_item))]
    pub fn upsert(&self, work_item: &WorkItem) -> Result<(), DatabaseError> {
        let connection = self.0.connection()?;
        diesel::insert_into(dsl::work_items)
            .values(work_item)
            .on_conflict((dsl::payment_id, dsl::repo_id, dsl::issue_number))
            .do_nothing()
            .execute(&*connection)?;
        Ok(())
    }

    /// Delete work items associated with a given payment ID
	///
	/// # Arguments
	///
	/// * `payment_id` - the payment ID of the WorkItem entities to delete
	///
	/// # Returns
	///
	/// Returns `Ok(())` if the operation succeeded
	///
	/// Returns an error of type `DatabaseError` if the operation failed
	///
	/// # Examples
	///
	/// ```rust
	/// # use std::sync::Arc;
    /// # use diesel::prelude::*;
    /// # use infrastructure::database::{Client, DatabaseError};
    /// # use domain::PaymentId;
	/// # use crate::domain::WorkItem;
	/// # use super::Repository;
    /// #
    /// # let connection = Client::new().connection().unwrap();
    /// # diesel::delete(dsl::work_items).execute(&connection).unwrap();
    /// #
	/// let payment_id = PaymentId::new();
	/// let work_item = WorkItem::new(payment_id.clone(), "test/repo".to_owned(), 123);
    /// diesel::insert_into(dsl::work_items)
    ///     .values(&work_item)
    ///     .execute(&connection)
    ///     .unwrap();
	/// let repository = Repository(Arc::new(Client::new()));
	/// let result = repository.delete_by_payment_id(&payment_id);
	/// assert!(result.is_ok());
	/// let count = dsl::work_items
    ///     .filter(dsl::payment_id.eq(&payment_id))
    ///     .count()
    ///     .get_result::<i64>(&connection)
    ///     .unwrap();
    /// assert_eq!(count, 0);
	/// ```
    #[tracing::instrument(skip(self))]
    pub fn delete_by_payment_id(&self, payment_id: &PaymentId) -> Result<(), DatabaseError> {
        let connection = self.0.connection()?;
        diesel::delete(dsl::work_items)
            .filter(dsl::payment_id.eq(payment_id))
            .execute(&*connection)?;
        Ok(())
    }
}