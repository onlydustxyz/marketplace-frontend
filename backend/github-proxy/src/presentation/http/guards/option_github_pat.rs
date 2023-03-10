use async_trait::async_trait;
use rocket::{
	request::{FromRequest, Outcome},
	Request,
};

#[derive(Debug, PartialEq, Eq)]
pub struct OptionGithubPat {
	github_pat: Option<String>,
}

impl From<OptionGithubPat> for Option<String> {
	fn from(value: OptionGithubPat) -> Self {
		value.github_pat
	}
}

impl From<&OptionGithubPat> for Option<String> {
	fn from(value: &OptionGithubPat) -> Self {
		value.github_pat.clone()
	}
}

#[async_trait]
impl<'r> FromRequest<'r> for OptionGithubPat {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<OptionGithubPat, ()> {
		match request.headers().get_one("x-github-pat") {
			Some(github_pat) => Outcome::Success(OptionGithubPat {
				github_pat: Some(github_pat.to_string()),
			}),
			None => return Outcome::Success(OptionGithubPat { github_pat: None }),
		}
	}
}

#[cfg(test)]
mod tests {
	use rocket::{
		http::Header,
		local::blocking::{Client, LocalRequest},
	};
	use rstest::{fixture, rstest};

	use super::*;

	#[fixture]
	fn client() -> Client {
		let rocket = rocket::build();
		Client::untracked(rocket).expect("valid rocket")
	}

	#[rstest]
	async fn from_request_with_github_pat_header(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-github-pat", "foooooooobaaaaaaaar"));

		let result = OptionGithubPat::from_request(&request).await;
		assert_eq!(
			result,
			Outcome::Success(OptionGithubPat {
				github_pat: Some("foooooooobaaaaaaaar".to_string())
			})
		);
	}

	#[rstest]
	async fn from_request_without_github_pat_header(client: Client) {
		let request: LocalRequest = client.post("/v1/graphql");

		let result = OptionGithubPat::from_request(&request).await;
		assert_eq!(
			result,
			Outcome::Success(OptionGithubPat { github_pat: None })
		);
	}
}
