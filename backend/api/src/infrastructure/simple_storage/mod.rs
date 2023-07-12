use std::{
    collections::hash_map::DefaultHasher,
    hash::{Hash, Hasher},
    str::FromStr,
    sync::Arc,
};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use rusoto_core::{HttpClient, Region};
use rusoto_core::credential::{AwsCredentials, CredentialsError, ProvideAwsCredentials};
use rusoto_s3::{PutObjectRequest, S3, S3Client, StreamingBody};
use serde::Deserialize;
use tokio_retry::{Retry, strategy::FixedInterval};
use url::Url;

use crate::domain::{ImageStoreService, ImageStoreServiceError};

#[derive(Deserialize)]
pub struct Config {
    pub images_bucket_name: String,
    pub bucket_region: String,
    pub access_key_id: String,
    pub secret_access_key: String,
}

#[derive(Clone)]
pub struct Client {
    s3_client: Arc<S3Client>,
    images_bucket_name: String,
    images_bucket_region: String,
}

struct AwsCredentialsProviderFromConfig {
    pub access_key_id: String,
    pub secret_access_key: String,
}

#[async_trait]
impl ProvideAwsCredentials for AwsCredentialsProviderFromConfig {
    async fn credentials(&self) -> std::result::Result<AwsCredentials, CredentialsError> {
        return Ok(AwsCredentials::new(&self.access_key_id, &self.secret_access_key, None, None));
    }
}

impl Client {
    pub async fn new(config: &Config) -> Result<Self> {
        let provider = AwsCredentialsProviderFromConfig { access_key_id: config.access_key_id.clone(), secret_access_key: config.secret_access_key.clone() };

        let s3_client = S3Client::new_with(
            HttpClient::new().unwrap(),
            provider,
            Region::from_str(config.bucket_region.as_str())?);
        // Check credentials as soon as the client is created
        // s3_client.list_buckets().await?;

        Ok(Self {
            s3_client: Arc::new(s3_client),
            images_bucket_name: config.images_bucket_name.clone(),
            images_bucket_region: config.bucket_region.clone(),
        })
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
    async fn store_image(&self, data: Vec<u8>) -> Result<Url, ImageStoreServiceError> {
        let object_name = format!("{}.{}", calculate_hash(&data), get_image_extension(&data)?);

        self.upload_data_to_s3(object_name.clone(), data).await?;

        Ok(Url::parse(
            format!(
                "https://{}.s3.{}.amazonaws.com/{object_name}",
                self.images_bucket_name, self.images_bucket_region
            )
                .as_str(),
        )
            .map_err(|e| ImageStoreServiceError::Other(e.into()))?)
    }

    async fn store_image_from_url(
        &self,
        original_image_url: &Url,
    ) -> Result<Url, ImageStoreServiceError> {
        let response = reqwest::get(original_image_url.clone())
            .await
            .map_err(ImageStoreServiceError::from)?
            .error_for_status()
            .map_err(ImageStoreServiceError::from)?;

        let data = response.bytes().await.map_err(ImageStoreServiceError::from)?.to_vec();

        self.store_image(data).await
    }
}

impl Client {
    async fn upload_data_to_s3(
        &self,
        object_name: String,
        image_binary_data: Vec<u8>,
    ) -> Result<(), ImageStoreServiceError> {
        Retry::spawn(FixedInterval::from_millis(500).take(2), move || {
            put_object(
                self.s3_client.clone(),
                self.images_bucket_name.clone(),
                object_name.clone(),
                image_binary_data.clone(),
            )
        })
            .await
    }
}

async fn put_object(
    s3_client: Arc<S3Client>,
    images_bucket_name: String,
    object_name: String,
    image_binary_data: Vec<u8>,
) -> Result<(), ImageStoreServiceError> {
    s3_client
        .put_object(PutObjectRequest {
            bucket: images_bucket_name,
            key: object_name,
            body: Some(StreamingBody::from(image_binary_data)),
            ..Default::default()
        })
        .await
        .map_err(|e| ImageStoreServiceError::Other(e.into()))?;
    Ok(())
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
