use diesel::{ExpressionMethods, RunQueryDsl};
use domain::PaymentId;
use infrastructure::database::{self, schema::work_items::dsl, Client, Result};

use super::WorkItem;

pub trait Repository: database::ImmutableRepository<WorkItem> {
	fn delete_by_payment_id(&self, payment_id: PaymentId) -> Result<()>;
}

impl Repository for Client {
	#[tracing::instrument(skip(self))]
	fn delete_by_payment_id(&self, payment_id: PaymentId) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::delete(dsl::work_items)
			.filter(dsl::payment_id.eq(payment_id))
			.execute(&mut *connection)?;
		Ok(())
	}
}
