use diesel::{
	pg::Pg,
	serialize::{Output, ToSql},
	sql_types::BigInt,
};
use domain::{GithubIssueId, GithubPullRequestId};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash, AsExpression)]
#[diesel(sql_type = diesel::sql_types::BigInt)]
pub enum DetailsId {
	Issue(GithubIssueId),
	PullRequest(GithubPullRequestId),
}

impl ToSql<BigInt, Pg> for DetailsId
where
	i64: ToSql<BigInt, Pg>,
{
	fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> diesel::serialize::Result {
		let id = match self {
			DetailsId::Issue(id) => (*id).into(),
			DetailsId::PullRequest(id) => (*id).into(),
		};
		<i64 as ToSql<BigInt, Pg>>::to_sql(&id, &mut out.reborrow())
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
