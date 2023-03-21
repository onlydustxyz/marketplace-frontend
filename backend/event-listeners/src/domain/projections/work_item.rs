use derive_getters::Getters;
use derive_new::new;
use domain::{GithubIssueNumber, PaymentId};
use infrastructure::database::schema::work_items;
use thiserror::Error;
use url::Url;

#[derive(Debug, Insertable, Identifiable, Queryable, new, Getters)]
#[primary_key(payment_id, repo_owner, repo_name, issue_number)]
pub struct WorkItem {
	payment_id: PaymentId,
	repo_owner: String,
	repo_name: String,
	issue_number: GithubIssueNumber,
}

#[derive(Error, Debug)]
pub enum Error {
	#[error("Invalid work item url")]
	InvalidUrl,
}

impl WorkItem {
	pub fn from_url(payment_id: PaymentId, url: Url) -> Result<Self, Error> {
		let mut path = url.path_segments().ok_or(Error::InvalidUrl)?;
		Ok(Self::new(
			payment_id,
			path.nth(0).ok_or(Error::InvalidUrl)?.to_owned(),
			path.nth(1).ok_or(Error::InvalidUrl)?.to_owned(),
			path.nth(3)
				.ok_or(Error::InvalidUrl)?
				.parse::<GithubIssueNumber>()
				.map_err(|_| Error::InvalidUrl)?,
		))
	}
}
