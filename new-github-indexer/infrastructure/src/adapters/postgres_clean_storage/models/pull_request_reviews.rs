use chrono::{NaiveDateTime, Utc};
use diesel::Identifiable;
use domain::models;

use crate::adapters::postgres_clean_storage::{schema::indexer_clean::pull_request_reviews, Error};

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model, PartialEq, Eq)]
pub struct PullRequestReview {
	pub id: i64,
	pub pull_request_id: i64,
	pub reviewer_id: i64,
	pub indexed_at: NaiveDateTime,
	pub data: serde_json::Value,
}

impl Identifiable for PullRequestReview {
	type Id = i64;

	fn id(self) -> Self::Id {
		self.id
	}
}

impl TryFrom<(models::PullRequestId, models::pulls::Review)> for PullRequestReview {
	type Error = Error;

	fn try_from(
		(pull_request_id, review): (models::PullRequestId, models::pulls::Review),
	) -> Result<Self, Self::Error> {
		Ok(Self {
			id: review.id.0 as i64,
			pull_request_id: pull_request_id.0 as i64,
			reviewer_id: review.user.clone().ok_or(Error::MissingField("review user"))?.id.0 as i64,
			indexed_at: Utc::now().naive_utc(),
			data: serde_json::to_value(review)?,
		})
	}
}
