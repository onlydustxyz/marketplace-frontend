use juniper::{GraphQLInputObject, GraphQLObject};
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

#[derive(Debug, GraphQLInputObject)]
pub struct WorkItem {
	pub repo_id: i32,
	pub issue_number: i32,
}

#[derive(Debug, GraphQLInputObject)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}

impl From<Reason> for domain::PaymentReason {
	fn from(reason: Reason) -> Self {
		Self {
			work_items: reason.work_items.into_iter().map(Into::into).collect(),
		}
	}
}

impl From<WorkItem> for domain::PaymentWorkItem {
	fn from(work_item: WorkItem) -> Self {
		Self {
			repo_id: (work_item.repo_id as i64).into(),
			issue_number: (work_item.issue_number as i64).into(),
		}
	}
}
