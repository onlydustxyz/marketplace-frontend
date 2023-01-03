use derive_more::IntoIterator;
use octocrab::FromResponse;
use reqwest::StatusCode;

#[derive(Default, IntoIterator)]
pub struct Contributors(Vec<octocrab::models::User>);

#[async_trait]
impl FromResponse for Contributors {
	async fn from_response(response: reqwest::Response) -> Result<Self, octocrab::Error> {
		match response.status() {
			StatusCode::NO_CONTENT => Ok(Default::default()),
			_ => Ok(Self(FromResponse::from_response(response).await?)),
		}
	}
}
