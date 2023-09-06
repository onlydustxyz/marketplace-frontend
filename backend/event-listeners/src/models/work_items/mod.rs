mod repository;

use diesel::Identifiable;
use domain::{GithubRepoId, GithubUserId, PaymentId, PaymentWorkItem, ProjectId};
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
	pub project_id: ProjectId,
	pub recipient_id: GithubUserId,
}

impl Identifiable for WorkItem {
	type Id = (PaymentId, GithubRepoId, i64);

	fn id(self) -> Self::Id {
		(self.payment_id, self.repo_id, self.number)
	}
}

impl From<(ProjectId, PaymentId, GithubUserId, PaymentWorkItem)> for WorkItem {
	fn from(
		(project_id, payment_id, recipient_id, work_item): (
			ProjectId,
			PaymentId,
			GithubUserId,
			PaymentWorkItem,
		),
	) -> Self {
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
				project_id,
				recipient_id,
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
				project_id,
				recipient_id,
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
				project_id,
				recipient_id,
			},
		}
	}
}
