use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::{GithubPullRequestId, GithubUserId};
use infrastructure::database::{
	enums::{GithubCodeReviewOutcome, GithubCodeReviewStatus},
	schema::github_pull_request_reviews,
};
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Identifiable, AsChangeset, Queryable, Serialize, Deserialize, Model,
)]
pub struct GithubPullRequestReview {
	pub pull_request_id: GithubPullRequestId,
	pub reviewer_id: GithubUserId,
	pub status: GithubCodeReviewStatus,
	pub outcome: Option<GithubCodeReviewOutcome>,
	pub submitted_at: Option<NaiveDateTime>,
	pub id: String,
}

impl Identifiable for GithubPullRequestReview {
	type Id = String;

	fn id(self) -> Self::Id {
		self.id
	}
}
