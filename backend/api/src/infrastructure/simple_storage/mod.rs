use std::{
	collections::hash_map::DefaultHasher,
	hash::{Hash, Hasher},
	str::FromStr,
};

use anyhow::anyhow;
use async_trait::async_trait;
use rusoto_core::Region;
use rusoto_s3::{PutObjectRequest, S3Client, StreamingBody, S3};
use serde::Deserialize;
use url::Url;

use crate::domain::{ImageStoreService, ImageStoreServiceError};

#[derive(Deserialize)]
pub struct Config {
	images_bucket_name: String,
	bucket_region: String,
}

#[derive(Clone)]
pub struct Client {
	s3_client: S3Client,
	images_bucket_name: String,
}

impl Client {
	pub async fn new(config: &Config) -> Self {
		let s3_client = S3Client::new(
			Region::from_str(config.bucket_region.as_str())
				.unwrap_or_else(|_| panic!("Invalid AWS region {}", config.bucket_region)),
		);

		// Check credentials as soon as the client is created
		s3_client
			.list_buckets()
			.await
			.expect("Could not list buckets. Check your AWS credentials.");

		Self {
			s3_client,
			images_bucket_name: config.images_bucket_name.clone(),
		}
	}
}

impl From<reqwest::Error> for ImageStoreServiceError {
	fn from(error: reqwest::Error) -> Self {
		match error.status() {
			Some(status) =>
				if status.is_client_error() {
					ImageStoreServiceError::NotFound(anyhow!(error))
				} else {
					ImageStoreServiceError::Other(anyhow!(error))
				},
			None => ImageStoreServiceError::Other(anyhow!(error)),
		}
	}
}

#[async_trait]
impl ImageStoreService for Client {
	async fn store_image(&self, original_image_url: &Url) -> Result<Url, ImageStoreServiceError> {
		let response = reqwest::get(original_image_url.clone())
			.await
			.map_err(ImageStoreServiceError::from)?
			.error_for_status()
			.map_err(ImageStoreServiceError::from)?;

		let image_binary_data =
			response.bytes().await.map_err(ImageStoreServiceError::from)?.to_vec();

		let object_name = format!(
			"{}.{}",
			calculate_hash(&image_binary_data),
			get_image_extension(&image_binary_data)?
		);

		self.s3_client
			.put_object(PutObjectRequest {
				bucket: self.images_bucket_name.clone(),
				key: object_name.to_string(),
				body: Some(StreamingBody::from(image_binary_data)),
				..Default::default()
			})
			.await
			.map_err(|e| ImageStoreServiceError::Other(e.into()))?;

		Ok(Url::parse(
			format!("https://onlydust-app-images.s3.eu-west-1.amazonaws.com/{object_name}")
				.as_str(),
		)
		.map_err(|e| ImageStoreServiceError::Other(e.into()))?)
	}
}

fn calculate_hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}

fn get_image_extension(binary_data: &[u8]) -> Result<String, ImageStoreServiceError> {
	Ok(infer::get(binary_data)
		.ok_or(ImageStoreServiceError::UnknownExtension(anyhow!(
			"Failed to infer image type based on binary data"
		)))?
		.extension()
		.to_string()
		.replace("xml", "svg"))
}
