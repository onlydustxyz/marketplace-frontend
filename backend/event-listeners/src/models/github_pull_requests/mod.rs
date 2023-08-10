mod commit;
pub use commit::GithubPullRequestCommit as Commit;

mod review;
use diesel_json::Json;
pub use review::GithubPullRequestReview as Review;

mod pull_request;
pub use pull_request::GithubPullRequest as Inner;

mod repository;
pub use repository::Repository;

#[derive(Debug, Clone)]
pub struct PullRequest {
	pub inner: Inner,
	pub commits: Option<Vec<Commit>>,
	pub reviews: Option<Vec<Review>>,
}

impl From<domain::GithubPullRequest> for PullRequest {
	fn from(pull_request: domain::GithubPullRequest) -> Self {
		Self {
			inner: Inner {
				id: pull_request.id,
				repo_id: pull_request.repo_id,
				number: pull_request.number,
				created_at: pull_request.created_at.naive_utc(),
				author_id: pull_request.author.id,
				merged_at: pull_request.merged_at.map(|date| date.naive_utc()),
				status: pull_request.status.into(),
				title: pull_request.title,
				html_url: pull_request.html_url.to_string(),
				closed_at: pull_request.closed_at.map(|date| date.naive_utc()),
				draft: pull_request.draft,
				ci_checks: None,
				closing_issue_numbers: None,
			},
			commits: None,
			reviews: None,
		}
	}
}

impl From<domain::GithubFullPullRequest> for PullRequest {
	fn from(from: domain::GithubFullPullRequest) -> Self {
		let mut pull_request = Self::from(from.inner);
		pull_request.inner.ci_checks = from.ci_checks.map(Into::into);
		pull_request.inner.closing_issue_numbers = from.closing_issue_numbers.map(Json::new);
		pull_request.commits = from.commits.map(|commits| {
			commits
				.into_iter()
				.map(|c| Commit {
					sha: c.sha,
					pull_request_id: pull_request.inner.id,
					html_url: c.html_url.to_string(),
					author_id: c.author.id,
				})
				.collect()
		});

		pull_request.reviews = from.reviews.map(|reviews| {
			reviews
				.into_iter()
				.map(|review| Review {
					pull_request_id: pull_request.inner.id,
					reviewer_id: review.reviewer.id,
					outcome: review.outcome.map(Into::into),
					status: review.status.into(),
					submitted_at: review.submitted_at.map(|date| date.naive_utc()),
				})
				.collect()
		});

		pull_request
	}
}
