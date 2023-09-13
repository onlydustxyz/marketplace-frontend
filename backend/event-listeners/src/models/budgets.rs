use diesel::{pg::Pg, Identifiable, Queryable};
use domain::BudgetId;
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;

#[derive(Debug, Insertable, Identifiable, AsChangeset, Model)]
pub struct Budget {
	pub id: BudgetId,
	pub initial_amount: Decimal,
	pub remaining_amount: Decimal,
}

impl<ST> Queryable<ST, Pg> for Budget
where
	(BudgetId, Decimal, Decimal, Decimal): Queryable<ST, Pg>,
{
	type Row = <(BudgetId, Decimal, Decimal, Decimal) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (id, initial_amount, remaining_amount, _) = Queryable::build(row)?;
		Ok(Self {
			id,
			initial_amount,
			remaining_amount,
		})
	}
}

impl Identifiable for Budget {
	type Id = BudgetId;

	fn id(self) -> Self::Id {
		self.id
	}
}
