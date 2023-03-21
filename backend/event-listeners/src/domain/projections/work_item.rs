use derive_getters::Getters;
use derive_new::new;
use domain::{GithubIssueNumber, PaymentId};
use infrastructure::database::schema::work_items;

#[derive(Debug, Insertable, Identifiable, Queryable, new, Getters)]
#[primary_key(payment_id, repo_owner, repo_name, issue_number)]
pub struct WorkItem {
	payment_id: PaymentId,
	repo_owner: String,
	repo_name: String,
	issue_number: GithubIssueNumber,
}
