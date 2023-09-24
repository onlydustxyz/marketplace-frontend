use anyhow::{anyhow, Result};
use domain::{
	GithubCodeReview, GithubCodeReviewOutcome, GithubCodeReviewStatus, GithubPullRequestId,
	GithubUser,
};
use octocrab::models::pulls::{Review, ReviewState};

use super::UserFromOctocrab;

pub trait TryIntoReview {
	fn try_into_code_review(self) -> Result<GithubCodeReview>;
}

impl TryIntoReview for (GithubPullRequestId, GithubUser) {
	fn try_into_code_review(self) -> Result<GithubCodeReview> {
		let (pull_request_id, reviewer) = self;
		Ok(GithubCodeReview {
			pull_request_id,
			reviewer,
			status: GithubCodeReviewStatus::Pending,
			outcome: None,
			submitted_at: None,
		})
	}
}

impl TryIntoReview for (GithubPullRequestId, Review) {
	fn try_into_code_review(self) -> Result<GithubCodeReview> {
		let (pull_request_id, review) = self;
		let user = review.user.ok_or_else(|| anyhow!("Missing user in code review"))?;
		let reviewer = GithubUser::from_octocrab_user(user);

		Ok(GithubCodeReview {
			pull_request_id,
			reviewer,
			outcome: review.state.and_then(|state| match state {
				ReviewState::Approved => Some(GithubCodeReviewOutcome::Approved),
				ReviewState::ChangesRequested => Some(GithubCodeReviewOutcome::ChangeRequested),
				_ => None,
			}),
			status: match review.state {
				Some(ReviewState::Approved) => GithubCodeReviewStatus::Completed,
				_ => GithubCodeReviewStatus::Pending,
			},
			submitted_at: review.submitted_at,
		})
	}
}
