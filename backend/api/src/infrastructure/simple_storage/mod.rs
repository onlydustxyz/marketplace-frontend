/// This module contains the implementation of the `ImageStoreService` trait using AWS S3 to store images.
use std::{
    collections::hash_map::DefaultHasher,
    hash::{Hash, Hasher},
    str::FromStr,
    sync::Arc,
};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use rusoto_core::Region;
use rusoto_s3::{PutObjectRequest, S3, S3Client, StreamingBody};
use serde::Deserialize;
use tokio_retry::{strategy::FixedInterval, Retry};
use url::Url;

use crate::domain::{ImageStoreService, ImageStoreServiceError};

/// A configuration struct for `S3ImageStoreClient`
#[derive(Deserialize)]
pub struct Config {
    /// The name of the S3 bucket where images are stored
    pub images_bucket_name: String,
    /// The region where the S3 bucket is hosted
    pub bucket_region: String,
}

/// An implementation of the `ImageStoreService` trait using AWS S3
#[derive(Clone)]
pub struct S3ImageStoreClient {
    /// An AWS S3 client
    s3_client: Arc<S3Client>,
    /// The name of the S3 bucket where images are stored
    images_bucket_name: String,
    /// The region where the S3 bucket is hosted
    images_bucket_region: String,
}

impl S3ImageStoreClient {
    /// Create a new `S3ImageStoreClient`
    ///
    /// # Arguments
    ///
    /// * `config` - A `Config` struct containing the configuration for the `S3ImageStoreClient`
    ///
    /// # Returns
    ///
    /// A new `S3ImageStoreClient`
    pub async fn new(config: &Config) -> Result<Self> {
        let s3_client = S3Client::new(Region::from_str(config.bucket_region.as_str())?);

        // Check credentials as soon as the client is created
        s3_client.list_buckets().await?;

        Ok(Self {
            s3_client: Arc::new(s3_client),
            images_bucket_name: config.images_bucket_name.clone(),
            images_bucket_region: config.bucket_region.clone(),
        })
    }

    /// Upload data to S3
    ///
    /// # Arguments
    ///
    /// * `object_name` - The name of the object to store in the S3 bucket
    /// * `image_binary_data` - The binary data to store in the S3 bucket
    ///
    /// # Returns
    ///
    /// A `Result` containing `Ok(())` if the upload succeeds and a `ImageStoreServiceError` if it fails
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
impl ImageStoreService for S3ImageStoreClient {
    /// Store an image in S3
    ///
    /// # Arguments
    ///
    /// * `original_image_url` - The URL of the image to store in S3
    ///
    /// # Returns
    ///
    /// A `Result` containing the URL of the stored image if the upload succeeds and a
    /// `ImageStoreServiceError` if it fails
    async fn store_image(
        &self,
        original_image_url: &Url,
    ) -> Result<Url, ImageStoreServiceError> {
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

        self.upload_data_to_s3(object_name.clone(), image_binary_data).await?;

        Ok(Url::parse(
            format!(
                "https://{}.s3.{}.amazonaws.com/{}",
                self.images_bucket_name, self.images_bucket_region, object_name
            )
            .as_str(),
        )
        .map_err(|e| ImageStoreServiceError::Other(e.into()))?)
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