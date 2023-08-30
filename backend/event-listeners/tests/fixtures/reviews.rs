use domain::{GithubCodeReview, GithubCodeReviewOutcome, GithubCodeReviewStatus};

use super::*;

#[allow(unused)]
pub fn approved(status: GithubCodeReviewStatus) -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::anthony(),
		status,
		outcome: Some(GithubCodeReviewOutcome::Approved),
		submitted_at: "2023-07-29T08:02:16Z".parse().ok(),
	}
}

#[allow(unused)]
pub fn change_requested(status: GithubCodeReviewStatus) -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::ofux(),
		status,
		outcome: Some(GithubCodeReviewOutcome::ChangeRequested),
		submitted_at: "2023-07-28T08:13:36Z".parse().ok(),
	}
}

#[allow(unused)]
pub fn commented(status: GithubCodeReviewStatus) -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::alex(),
		status,
		outcome: None,
		submitted_at: "2023-07-28T08:15:32Z".parse().ok(),
	}
}

#[allow(unused)]
pub fn requested(status: GithubCodeReviewStatus) -> GithubCodeReview {
	GithubCodeReview {
		reviewer: users::anthony(),
		status,
		outcome: None,
		submitted_at: None,
	}
}
