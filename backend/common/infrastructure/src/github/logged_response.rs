use async_trait::async_trait;
use octocrab::FromResponse;
use olog::debug;
use reqwest::header::HeaderMap;

pub(crate) struct LoggedResponse<R>(pub R);

#[async_trait]
impl<R> FromResponse for LoggedResponse<R>
where
	R: FromResponse,
{
	async fn from_response(response: reqwest::Response) -> octocrab::Result<Self> {
		response.debug_technical_headers("Received response for Octocrab");
		Ok(LoggedResponse(R::from_response(response).await?))
	}
}

pub trait DebugTechnicalHeaders {
	fn debug_technical_headers(&self, message: &'static str);
}

impl DebugTechnicalHeaders for reqwest::Response {
	fn debug_technical_headers(&self, message: &'static str) {
		debug!(
			url = self.url().to_string(),
			status = self.status().to_string(),
			header_x_cache = self.get_header_as_str("X-Cache"),
			header_x_cache_hits = self.get_header_as_str("X-Cache-Hits"),
			header_fastly_debug_ttl = self.get_header_as_str("Fastly-Debug-TTL"),
			header_age = self.get_header_as_str("Age"),
			header_cache_control = self.get_header_as_str("Cache-Control"),
			header_etag = self.get_header_as_str("Etag"),
			header_x_ratelimit_limit = self.get_header_as_str("X-Ratelimit-Limit"),
			header_x_ratelimit_remaining = self.get_header_as_str("X-Ratelimit-Remaining"),
			header_x_ratelimit_reset = self.get_header_as_str("X-Ratelimit-Reset"),
			message
		);
	}
}

pub trait HeaderStrGetter {
	fn get_header_as_str(&self, key: &str) -> Option<&str>;
}

impl HeaderStrGetter for reqwest::Response {
	fn get_header_as_str(&self, key: &str) -> Option<&str> {
		self.headers().get_header_as_str(key)
	}
}

impl HeaderStrGetter for HeaderMap {
	fn get_header_as_str(&self, key: &str) -> Option<&str> {
		if let Some(header_value) = self.get(key) {
			Some(header_value.to_str().unwrap_or_default())
		} else {
			None
		}
	}
}
