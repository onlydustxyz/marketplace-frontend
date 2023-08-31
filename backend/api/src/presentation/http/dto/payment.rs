use serde::Deserialize;

#[derive(Debug, Deserialize)]
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

#[derive(Debug, Deserialize)]
pub struct WorkItem {
	pub repo_id: i32,
	pub issue_number: i32,
}

impl From<WorkItem> for domain::PaymentWorkItem {
	fn from(work_item: WorkItem) -> Self {
		Self {
			repo_id: (work_item.repo_id as i64).into(),
			issue_number: (work_item.issue_number as i64).into(),
		}
	}
}
