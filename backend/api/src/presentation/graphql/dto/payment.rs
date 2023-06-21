use juniper::GraphQLObject;
use uuid08::Uuid;

use super::Amount;

#[derive(Debug, GraphQLObject)]
pub struct Payment {
	pub project_id: Uuid,
	pub budget_id: Uuid,
	pub payment_id: Uuid,
	pub command_id: Uuid,
	pub amount: Amount,
}
