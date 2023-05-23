/// A type representing an optional GitHub personal access token (PAT).
///
/// # Examples
///
/// ```
/// use rocket::Request;
/// use rocket_contrib::json::Json;
/// use serde::{Deserialize, Serialize};
///
/// #[rocket::post("/my-endpoint")]
/// async fn my_endpoint(pat: Option<github_pat::OptionGithubPat>, req: Request) -> Json {
///     let response = match pat {
///         Some(pat) => {
///             // do something with pat
///             // ...
///             rocket::http::Status::Ok
///         }
///         None => rocket::http::Status::Unauthorized,
///     };
///
///     Json(response.to_string())
/// }
/// ```
#[derive(Debug, PartialEq, Eq)]
pub struct OptionGithubPat {
    /// The GitHub personal access token (PAT).
    pub github_pat: Option<String>,
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

    /// Convert the value from the request into an `OptionGithubPat`.
    ///
    /// # Parameters
    ///
    /// - `request`: The `Request` object containing the value to convert.
    ///
    /// # Returns
    ///
    ///  - `Outcome::Success(option_github_pat)`: If the request contains the `GITHUB_ACCESS_TOKEN_HEADER` header, then `option_github_pat` will be an `OptionGithubPat` object containing the PAT value.
    ///
    ///  - `Outcome::Success(option_github_pat)`: If the request does not contain the `GITHUB_ACCESS_TOKEN_HEADER` header, then `option_github_pat` will be an `OptionGithubPat` object with `None` as PAT value.
    ///
    ///  - `Outcome::Failure(())`: If an error occurs during processing.
    async fn from_request(request: &'r Request<'_>) -> Outcome<OptionGithubPat, ()> {
        match request.headers().get_one(GITHUB_ACCESS_TOKEN_HEADER) {
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
        request.add_header(Header::new(
            GITHUB_ACCESS_TOKEN_HEADER,
            "foooooooobaaaaaaaar",
        ));

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