use domain::{GithubIssueNumber, GithubRepoId, PaymentId};
use infrastructure::database::schema::work_items;

#[derive(Debug, Insertable, Identifiable, Queryable)]
#[diesel(primary_key(payment_id, repo_id, issue_number))]
pub struct WorkItem {
	pub payment_id: PaymentId,
	pub repo_id: GithubRepoId,
	pub issue_number: GithubIssueNumber,
}
