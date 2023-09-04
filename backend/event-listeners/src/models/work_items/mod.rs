mod repository;

use diesel::Identifiable;
use domain::{GithubRepoId, PaymentId};
use infrastructure::database::schema::work_items;

pub use self::repository::Repository;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(primary_key(payment_id, repo_id, issue_number))]
pub struct WorkItem {
	pub payment_id: PaymentId,
	pub repo_id: GithubRepoId,
	pub issue_number: i64,
}

impl Identifiable for WorkItem {
	type Id = (PaymentId, GithubRepoId, i64);

	fn id(self) -> Self::Id {
		(self.payment_id, self.repo_id, self.issue_number)
	}
}
