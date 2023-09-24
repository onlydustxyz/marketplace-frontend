use std::num::ParseIntError;

use http_api_problem::HttpApiProblem;
use reqwest::StatusCode;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Reason {
	pub work_items: Vec<WorkItem>,
}

impl TryFrom<Reason> for domain::PaymentReason {
	type Error = HttpApiProblem;

	fn try_from(reason: Reason) -> Result<Self, Self::Error> {
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
#[serde(rename_all = "camelCase")]
pub struct WorkItem {
	pub id: String,
	pub r#type: WorkItemType,
	pub repo_id: u64,
	pub number: u64,
	pub reviewer_id: Option<i64>,
}

impl TryFrom<WorkItem> for domain::PaymentWorkItem {
	type Error = HttpApiProblem;

	fn try_from(work_item: WorkItem) -> Result<Self, Self::Error> {
		Ok(match work_item.r#type {
			WorkItemType::Issue => domain::PaymentWorkItem::Issue {
				id: work_item.id.parse().map_err(|e: ParseIntError| {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title("Invalid Issue ID in work item")
						.detail(e.to_string())
				})?,
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
			WorkItemType::PullRequest => domain::PaymentWorkItem::PullRequest {
				id: work_item.id.parse().map_err(|e: ParseIntError| {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title("Invalid Pull Request ID in work item")
						.detail(e.to_string())
				})?,
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
			WorkItemType::CodeReview => domain::PaymentWorkItem::CodeReview {
				id: work_item.id.parse().map_err(|e: anyhow::Error| {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title("Invalid Review ID in work item")
						.detail(e.to_string())
				})?,
				repo_id: work_item.repo_id.into(),
				number: work_item.number.into(),
			},
		})
	}
}
