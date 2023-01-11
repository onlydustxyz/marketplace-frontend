use derive_getters::Getters;
use derive_more::Constructor;
use domain::{BudgetId, ProjectId};
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor, Getters)]
pub struct Budget {
	id: BudgetId,
	project_id: Option<ProjectId>,
	initial_amount: Decimal,
	pub remaining_amount: Decimal,
}
