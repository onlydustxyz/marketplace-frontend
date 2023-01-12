use async_trait::async_trait;
use octocrab::FromResponse;
use olog::debug;

pub(crate) struct LoggedResponse<R>(pub R);

#[async_trait]
impl<R> FromResponse for LoggedResponse<R>
where
	R: FromResponse,
{
	async fn from_response(response: reqwest::Response) -> octocrab::Result<Self> {
		debug!(
			url = response.url().to_string(),
			status = response.status().to_string(),
			header_x_cache = response.get_header_as_str("X-Cache"),
			header_x_cache_hits = response.get_header_as_str("X-Cache-Hits"),
			header_fastly_debug_ttl = response.get_header_as_str("Fastly-Debug-TTL"),
			header_age = response.get_header_as_str("Age"),
			header_cache_control = response.get_header_as_str("Cache-Control"),
			header_etag = response.get_header_as_str("Etag"),
			header_x_ratelimit_limit = response.get_header_as_str("X-Ratelimit-Limit"),
			header_x_ratelimit_remaining = response.get_header_as_str("X-Ratelimit-Remaining"),
			header_x_ratelimit_reset = response.get_header_as_str("X-Ratelimit-Reset"),
			"Received response for Octocrab"
		);
		Ok(LoggedResponse(R::from_response(response).await?))
	}
}

trait HeaderStrGetter {
	fn get_header_as_str(&self, key: &str) -> Option<&str>;
}

impl HeaderStrGetter for reqwest::Response {
	fn get_header_as_str(&self, key: &str) -> Option<&str> {
		if let Some(header_value) = self.headers().get(key) {
			Some(header_value.to_str().unwrap_or_default())
		} else {
			None
		}
	}
}
