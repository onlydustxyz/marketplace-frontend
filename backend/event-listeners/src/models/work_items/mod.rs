mod repository;

use diesel::Identifiable;
use domain::{GithubRepoId, PaymentId, PaymentWorkItem};
use infrastructure::database::{enums::ContributionType, schema::work_items};

pub use self::repository::Repository;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(primary_key(payment_id, repo_id, number))]
pub struct WorkItem {
	pub payment_id: PaymentId,
	pub repo_id: GithubRepoId,
	pub number: i64,
	pub id: String,
	pub type_: ContributionType,
}

impl Identifiable for WorkItem {
	type Id = (PaymentId, GithubRepoId, i64);

	fn id(self) -> Self::Id {
		(self.payment_id, self.repo_id, self.number)
	}
}

impl From<(PaymentId, PaymentWorkItem)> for WorkItem {
	fn from((payment_id, work_item): (PaymentId, PaymentWorkItem)) -> Self {
		match work_item {
			PaymentWorkItem::Issue {
				id,
				repo_id,
				number,
			} => Self {
				payment_id,
				repo_id,
				number: number.into(),
				id: id.to_string(),
				type_: ContributionType::Issue,
			},
			PaymentWorkItem::CodeReview {
				id,
				repo_id,
				number,
			} => Self {
				payment_id,
				repo_id,
				number: number.into(),
				id: id.to_string(),
				type_: ContributionType::CodeReview,
			},
			PaymentWorkItem::PullRequest {
				id,
				repo_id,
				number,
			} => Self {
				payment_id,
				repo_id,
				number: number.into(),
				id: id.to_string(),
				type_: ContributionType::PullRequest,
			},
		}
	}
}
