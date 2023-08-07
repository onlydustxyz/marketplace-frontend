use anyhow::{anyhow, Result};
use domain::{GithubCodeReview, GithubCodeReviewOutcome, GithubCodeReviewStatus, GithubUser};
use octocrab::models::{
	pulls::{Review, ReviewState},
	User,
};

use super::UserFromOctocrab;

pub trait TryIntoReview {
	fn try_into_code_review(self) -> Result<GithubCodeReview>;
}

impl TryIntoReview for User {
	fn try_into_code_review(self) -> Result<GithubCodeReview> {
		Ok(GithubCodeReview {
			reviewer: GithubUser::from_octocrab_user(self),
			status: GithubCodeReviewStatus::Pending,
			outcome: None,
			submitted_at: None,
		})
	}
}

impl TryIntoReview for Review {
	fn try_into_code_review(self) -> Result<GithubCodeReview> {
		let user = self.user.ok_or_else(|| anyhow!("Missing user in code review"))?;

		Ok(GithubCodeReview {
			reviewer: GithubUser::from_octocrab_user(user),
			outcome: self.state.and_then(|state| match state {
				ReviewState::Approved => Some(GithubCodeReviewOutcome::Approved),
				ReviewState::ChangesRequested => Some(GithubCodeReviewOutcome::ChangeRequested),
				_ => None,
			}),
			status: match self.state {
				Some(ReviewState::Approved) => GithubCodeReviewStatus::Completed,
				_ => GithubCodeReviewStatus::Pending,
			},
			submitted_at: self.submitted_at,
		})
	}
}
