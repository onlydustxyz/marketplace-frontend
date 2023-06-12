use derive_getters::Getters;
use derive_new::new;
use domain::{GithubIssueNumber, GithubRepoId, PaymentId};
use infrastructure::database::schema::work_items;

#[derive(Debug, Insertable, Identifiable, Queryable, new, Getters)]
#[diesel(primary_key(payment_id, repo_id, issue_number))]
pub struct WorkItem {
	payment_id: PaymentId,
	repo_id: GithubRepoId,
	issue_number: GithubIssueNumber,
}
