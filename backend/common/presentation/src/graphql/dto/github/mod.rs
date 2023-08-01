mod issue;
mod pull_request;
mod user;

pub use issue::Issue;
pub use pull_request::PullRequest;
pub use user::User;

trait ToInt32 {
	fn to_i32(self) -> i32;
}

impl<T: Into<i64>> ToInt32 for T {
	fn to_i32(self) -> i32 {
		Into::<i64>::into(self)
			.try_into()
			.expect("{self} cannot be safely represented as a valid 32 bit integer")
	}
}
