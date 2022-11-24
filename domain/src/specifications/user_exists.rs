#[cfg(test)]
use mockall::automock;
use std::sync::Arc;

use super::Error;
use crate::*;

pub struct Specification {
	user_repository: Arc<dyn UserRepository>,
}

#[cfg_attr(test, automock)]
impl Specification {
	pub fn new(user_repository: Arc<dyn UserRepository>) -> Self {
		Self { user_repository }
	}

	pub async fn is_satisfied_by(&self, user_id: &UserId) -> Result<bool, Error> {
		match self.user_repository.find_by_id(user_id).await {
			Ok(_) => Ok(true),
			Err(e) => match e {
				UserRepositoryError::NotFound => Ok(false),
				UserRepositoryError::Infrastructure(_) => Err(Error::UserRepository(e)),
			},
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use anyhow::anyhow;
	use assert_matches::assert_matches;
	use mockall::predicate::*;
	use rstest::{fixture, rstest};
	use std::str::FromStr;
	use uuid::Uuid;

	#[fixture]
	fn user_id() -> UserId {
		Uuid::from_str("33333333-bbbb-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[rstest]
	async fn test_is_satisfied_by(user_id: UserId) {
		let mut user_repository = MockUserRepository::new();
		user_repository
			.expect_find_by_id()
			.with(eq(user_id))
			.once()
			.returning(|id| Ok(User::new(*id)));

		let specification = Specification::new(Arc::new(user_repository));

		let result = specification.is_satisfied_by(&user_id).await.unwrap();
		assert!(result);
	}

	#[rstest]
	async fn test_is_not_satisfied_by(user_id: UserId) {
		let mut user_repository = MockUserRepository::new();
		user_repository
			.expect_find_by_id()
			.with(eq(user_id))
			.once()
			.returning(|_| Err(UserRepositoryError::NotFound));

		let specification = Specification::new(Arc::new(user_repository));

		let result = specification.is_satisfied_by(&user_id).await.unwrap();
		assert!(!result);
	}

	#[rstest]
	async fn test_is_satisfied_by_error(user_id: UserId) {
		let mut user_repository = MockUserRepository::new();
		user_repository
			.expect_find_by_id()
			.with(eq(user_id))
			.once()
			.returning(|_| Err(UserRepositoryError::Infrastructure(anyhow!("foo"))));

		let specification = Specification::new(Arc::new(user_repository));

		let result = specification.is_satisfied_by(&user_id).await;
		assert!(result.is_err());
		assert_matches!(result, Err(Error::UserRepository(_)));
	}
}
