use diesel::{Identifiable, Queryable};
use domain::BudgetId;
use infrastructure::database::{enums::Currency, schema::budgets};
use rust_decimal::Decimal;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct Budget {
	pub id: BudgetId,
	pub initial_amount: Decimal,
	pub remaining_amount: Decimal,
	pub currency: Currency,
}

impl Identifiable for Budget {
	type Id = BudgetId;

	fn id(self) -> Self::Id {
		self.id
	}
}
