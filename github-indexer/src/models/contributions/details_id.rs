use derive_more::Display;
use diesel::{
	pg::Pg,
	serialize::{Output, ToSql},
	sql_types::Text,
};
use domain::{GithubCodeReviewId, GithubIssueId, GithubPullRequestId};
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Copy, Clone, Serialize, Deserialize, Display, PartialEq, Eq, Hash, AsExpression,
)]
#[diesel(sql_type = diesel::sql_types::Text)]
pub enum DetailsId {
	Issue(GithubIssueId),
	PullRequest(GithubPullRequestId),
	CodeReview(GithubCodeReviewId),
}

impl ToSql<Text, Pg> for DetailsId
where
	String: ToSql<Text, Pg>,
{
	fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> diesel::serialize::Result {
		let id = match self {
			DetailsId::Issue(id) => id.to_string(),
			DetailsId::PullRequest(id) => id.to_string(),
			DetailsId::CodeReview(id) => id.to_string(),
		};
		<String as ToSql<Text, Pg>>::to_sql(&id, &mut out.reborrow())
	}
}

impl From<GithubIssueId> for DetailsId {
	fn from(id: GithubIssueId) -> Self {
		Self::Issue(id)
	}
}

impl From<GithubPullRequestId> for DetailsId {
	fn from(id: GithubPullRequestId) -> Self {
		Self::PullRequest(id)
	}
}

impl From<GithubCodeReviewId> for DetailsId {
	fn from(id: GithubCodeReviewId) -> Self {
		Self::CodeReview(id)
	}
}
