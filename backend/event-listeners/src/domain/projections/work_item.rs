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

#[derive(Error, Debug, PartialEq, Eq)]
pub enum Error {
	#[error("Invalid work item url")]
	InvalidUrl,
}

impl WorkItem {
	pub fn from_url(payment_id: PaymentId, url: Url) -> Result<Self, Error> {
		let mut path = url.path_segments().ok_or(Error::InvalidUrl)?;
		Ok(Self::new(
			payment_id,
			path.next().ok_or(Error::InvalidUrl)?.to_owned(),
			path.next().ok_or(Error::InvalidUrl)?.to_owned(),
			path.nth(1)
				.ok_or(Error::InvalidUrl)?
				.parse::<GithubIssueNumber>()
				.map_err(|_| Error::InvalidUrl)?,
		))
	}
}

#[cfg(test)]
mod tests {
	use rstest::*;
	use uuid::Uuid;

	use super::*;

	#[fixture]
	#[once]
	fn payment_id() -> PaymentId {
		Uuid::new_v4().into()
	}

	#[rstest]
	#[case("https://github.com/onlydustxyz/marketplace/pull/123")]
	#[case("https://www.github.com/onlydustxyz/marketplace/pull/123")]
	#[case("http://github.com/onlydustxyz/marketplace/pull/123")]
	#[case("https://github.com/onlydustxyz/marketplace/issue/123")]
	#[case("https://github.com/onlydustxyz/marketplace/issues/123")]
	fn create_work_item_from_valid_url(payment_id: &PaymentId, #[case] url: Url) {
		let work_item = WorkItem::from_url(*payment_id, url).expect("Unable to create work item");
		assert_eq!(work_item.payment_id, *payment_id);
		assert_eq!(work_item.repo_owner, "onlydustxyz");
		assert_eq!(work_item.repo_name, "marketplace");
		assert_eq!(work_item.issue_number, 123.into());
	}

	#[rstest]
	#[case("https://github.com/onlydustxyz/marketplace/pull/")]
	#[case("https://github.com/onlydustxyz/marketplace/pull/123abc")]
	#[case("https://github.com/onlydustxyz/marketplace/123")]
	#[case("https://github.com/onlydustxyz/marketplace")]
	#[case("https://github.com/onlydustxyz")]
	fn create_work_item_from_invalid_url(payment_id: &PaymentId, #[case] url: Url) {
		let result = WorkItem::from_url(*payment_id, url);
		assert!(result.is_err());
		assert_eq!(result.unwrap_err(), Error::InvalidUrl);
	}
}
