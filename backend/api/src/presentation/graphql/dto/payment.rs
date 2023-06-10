use domain::{BudgetId, CommandId, PaymentId, ProjectId};
use juniper::GraphQLObject;

use super::Amount;

#[derive(Debug, GraphQLObject)]
pub struct Payment {
	pub project_id: ProjectId,
	pub budget_id: BudgetId,
	pub payment_id: PaymentId,
	pub command_id: CommandId,
	pub amount: Amount,
}
