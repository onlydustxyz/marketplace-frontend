use derive_more::Constructor;
use domain::{BudgetId, PaymentId, ProjectId};
use juniper::GraphQLObject;

use super::Amount;

#[derive(Debug, Constructor, GraphQLObject)]
pub struct Payment {
	project_id: ProjectId,
	budget_id: BudgetId,
	payment_id: PaymentId,
	amount: Amount,
}
