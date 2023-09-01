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
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum WorkItemType {
	Issue,
	PullRequest,
	CodeReview,
}

#[derive(Debug, Deserialize)]
pub struct WorkItem {
	pub r#type: WorkItemType,
	pub repo_id: u64,
	pub number: u64,
}

impl From<WorkItem> for domain::PaymentWorkItem {
	fn from(work_item: WorkItem) -> Self {
		match work_item.r#type {
			WorkItemType::Issue => domain::PaymentWorkItem::Issue {
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
			WorkItemType::PullRequest => domain::PaymentWorkItem::PullRequest {
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
			WorkItemType::CodeReview => domain::PaymentWorkItem::CodeReview {
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
		}
	}
}
