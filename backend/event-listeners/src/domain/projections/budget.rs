use derive_getters::Getters;
use derive_more::Constructor;
use diesel::{pg::Pg, Queryable};
use domain::{BudgetId, ProjectId};
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;

#[derive(Debug, Insertable, Identifiable, AsChangeset, Constructor, Getters)]
pub struct Budget {
	id: BudgetId,
	project_id: Option<ProjectId>,
	initial_amount: Decimal,
	pub remaining_amount: Decimal,
}

impl domain::Entity for Budget {
	type Id = BudgetId;
}

impl<ST> Queryable<ST, Pg> for Budget
where
	(BudgetId, Option<ProjectId>, Decimal, Decimal, Decimal): Queryable<ST, Pg>,
{
	type Row = <(BudgetId, Option<ProjectId>, Decimal, Decimal, Decimal) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> Self {
		let (id, project_id, initial_amount, remaining_amount, _) = Queryable::build(row);
		Self {
			id,
			project_id,
			initial_amount,
			remaining_amount,
		}
	}
}
