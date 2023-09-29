use diesel::{ExpressionMethods, RunQueryDsl};
use domain::PaymentId;
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database::schema::work_items::dsl,
	dbclient::{self, Client, Result},
};

use super::WorkItem;

pub trait Repository: dbclient::ImmutableRepository<WorkItem> {
	fn delete_by_payment_id(&self, payment_id: PaymentId) -> Result<()>;
}

impl Repository for Client {
	#[tracing::instrument(skip(self))]
	fn delete_by_payment_id(&self, payment_id: PaymentId) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::delete(dsl::work_items)
			.filter(dsl::payment_id.eq(payment_id))
			.execute(&mut *connection)
			.err_with_context(format!("delete work_items where payment_id={payment_id}"))?;
		Ok(())
	}
}
