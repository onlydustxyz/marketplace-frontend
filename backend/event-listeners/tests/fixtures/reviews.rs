use domain::{GithubCodeReview, GithubCodeReviewOutcome, GithubCodeReviewStatus};

use super::*;

#[allow(unused)]
pub fn approved() -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::anthony(),
		status: GithubCodeReviewStatus::Completed,
		outcome: Some(GithubCodeReviewOutcome::Approved),
		submitted_at: "2023-07-31T09:32:08Z".parse().ok(),
	}
}

#[allow(unused)]
pub fn change_requested() -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::anthony(),
		status: GithubCodeReviewStatus::Pending,
		outcome: Some(GithubCodeReviewOutcome::ChangeRequested),
		submitted_at: "2023-07-31T09:32:08Z".parse().ok(),
	}
}

#[allow(unused)]
pub fn pending() -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::alex(),
		status: GithubCodeReviewStatus::Pending,
		outcome: None,
		submitted_at: None,
	}
}
