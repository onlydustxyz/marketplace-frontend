mod commit;
pub use commit::GithubPullRequestCommit as Commit;

mod review;
pub use review::GithubPullRequestReview as Review;

mod closing_issues;
pub use closing_issues::ClosingIssue;

mod pull_request;
pub use pull_request::GithubPullRequest as Inner;

#[derive(Debug, Clone)]
pub struct PullRequest {
	pub inner: Inner,
	pub commits: Option<Vec<Commit>>,
	pub reviews: Option<Vec<Review>>,
	pub closing_issues: Option<Vec<ClosingIssue>>,
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
			},
			commits: None,
			reviews: None,
			closing_issues: None,
		}
	}
}

impl From<domain::GithubFullPullRequest> for PullRequest {
	fn from(from: domain::GithubFullPullRequest) -> Self {
		let mut pull_request = Self::from(from.inner);
		pull_request.inner.ci_checks = from.ci_checks.map(Into::into);
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
					id: review.id().to_string(),
					pull_request_id: review.pull_request_id,
					reviewer_id: review.reviewer.id,
					outcome: review.outcome.map(Into::into),
					status: review.status.into(),
					submitted_at: review.submitted_at.map(|date| date.naive_utc()),
				})
				.collect()
		});

		pull_request.closing_issues = from.closing_issue_ids.map(|closing_issue_ids| {
			closing_issue_ids
				.into_iter()
				.map(|github_issue_id| ClosingIssue {
					github_issue_id,
					github_pull_request_id: pull_request.inner.id,
				})
				.collect()
		});

		pull_request
	}
}
