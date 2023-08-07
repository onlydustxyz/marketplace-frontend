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
#[diesel(primary_key(pull_request_id, reviewer_id))]
pub struct GithubPullRequestReview {
	pub pull_request_id: GithubPullRequestId,
	pub reviewer_id: GithubUserId,
	pub status: GithubCodeReviewStatus,
	pub outcome: Option<GithubCodeReviewOutcome>,
	pub submitted_at: Option<NaiveDateTime>,
}

impl Identifiable for GithubPullRequestReview {
	type Id = (GithubPullRequestId, GithubUserId);

	fn id(self) -> Self::Id {
		(self.pull_request_id, self.reviewer_id)
	}
}
