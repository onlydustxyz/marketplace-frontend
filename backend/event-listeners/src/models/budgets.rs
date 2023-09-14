use diesel::{pg::Pg, Identifiable, Queryable};
use domain::BudgetId;
use infrastructure::database::{enums::Currency, schema::budgets};
use rust_decimal::Decimal;

#[derive(Debug, Insertable, Identifiable, AsChangeset, Model)]
pub struct Budget {
	pub id: BudgetId,
	pub initial_amount: Decimal,
	pub remaining_amount: Decimal,
	pub currency: Currency,
}

impl<ST> Queryable<ST, Pg> for Budget
where
	(BudgetId, Decimal, Decimal, Decimal, Currency): Queryable<ST, Pg>,
{
	type Row = <(BudgetId, Decimal, Decimal, Decimal, Currency) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (id, initial_amount, remaining_amount, _, currency) = Queryable::build(row)?;
		Ok(Self {
			id,
			initial_amount,
			remaining_amount,
			currency,
		})
	}
}

impl Identifiable for Budget {
	type Id = BudgetId;

	fn id(self) -> Self::Id {
		self.id
	}
}
