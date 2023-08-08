mod commit;
pub use commit::GithubPullRequestCommit as Commit;

mod review;
pub use review::GithubPullRequestReview as Review;

mod pull_request;
pub use pull_request::GithubPullRequest as Inner;

mod repository;
pub use repository::Repository;

#[derive(Debug)]
pub struct PullRequest {
	pub inner: Inner,
	pub commits: Vec<Commit>,
	pub reviews: Vec<Review>,
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
				ci_checks: pull_request.ci_checks.map(Into::into),
			},
			commits: pull_request
				.commits
				.into_iter()
				.map(|c| Commit {
					sha: c.sha,
					pull_request_id: pull_request.id,
					html_url: c.html_url.to_string(),
					author_id: c.author.id,
				})
				.collect(),
			reviews: pull_request
				.reviews
				.into_iter()
				.map(|review| Review {
					pull_request_id: pull_request.id,
					reviewer_id: review.reviewer.id,
					outcome: review.outcome.map(Into::into),
					status: review.status.into(),
					submitted_at: review.submitted_at.map(|date| date.naive_utc()),
				})
				.collect(),
		}
	}
}
