use std::sync::Arc;

use derive_more::Constructor;
use diesel::{ExpressionMethods, RunQueryDsl};
use domain::PaymentId;
use infrastructure::database::{schema::work_items::dsl, Client, DatabaseError};

use crate::domain::WorkItem;

#[derive(Constructor)]
pub struct Repository(Arc<Client>);

impl Repository {
	#[tracing::instrument(skip(self))]
	pub fn upsert(&self, work_item: &WorkItem) -> Result<(), DatabaseError> {
		let connection = self.0.connection()?;
		diesel::insert_into(dsl::work_items)
			.values(work_item)
			.on_conflict((
				dsl::payment_id,
				dsl::repo_owner,
				dsl::repo_name,
				dsl::issue_number,
			))
			.do_nothing()
			.execute(&*connection)?;
		Ok(())
	}

	#[tracing::instrument(skip(self))]
	pub fn delete_by_payment_id(&self, payment_id: &PaymentId) -> Result<(), DatabaseError> {
		let connection = self.0.connection()?;
		diesel::delete(dsl::work_items)
			.filter(dsl::payment_id.eq(payment_id))
			.execute(&*connection)?;
		Ok(())
	}
}
