use http_api_problem::HttpApiProblem;
use reqwest::StatusCode;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}

impl TryFrom<Reason> for domain::PaymentReason {
	type Error = HttpApiProblem;

	fn try_from(reason: Reason) -> Result<Self, HttpApiProblem> {
		let mut work_items = Vec::with_capacity(reason.work_items.len());
		for work_item in reason.work_items {
			work_items.push(work_item.try_into()?);
		}

		Ok(Self { work_items })
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
	pub id: u64,
	pub r#type: WorkItemType,
	pub repo_id: u64,
	pub number: u64,
	pub reviewer_id: Option<i64>,
}

impl TryFrom<WorkItem> for domain::PaymentWorkItem {
	type Error = HttpApiProblem;

	fn try_from(work_item: WorkItem) -> Result<Self, HttpApiProblem> {
		Ok(match work_item.r#type {
			WorkItemType::Issue => domain::PaymentWorkItem::Issue {
				id: work_item.id.into(),
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
			WorkItemType::PullRequest => domain::PaymentWorkItem::PullRequest {
				id: work_item.id.into(),
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
			WorkItemType::CodeReview => domain::PaymentWorkItem::CodeReview {
				id: work_item.id.into(),
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
				reviewer_id: work_item
					.reviewer_id
					.ok_or_else(|| {
						HttpApiProblem::new(StatusCode::BAD_REQUEST)
							.detail("Reviewer ID is mandatory when work item is a code review")
					})?
					.into(),
			},
		})
	}
}
