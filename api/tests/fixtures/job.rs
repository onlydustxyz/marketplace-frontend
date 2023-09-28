use anyhow::Result;
use async_trait::async_trait;
use rocket::http::hyper::body::HttpBody;
use tokio::sync::mpsc;
use tokio_cron_scheduler::{Job, JobScheduler, OnJobNotification};

#[async_trait::async_trait]
pub trait Runnable {
	async fn run(&self) -> Result<()>;
}

#[async_trait]
impl Runnable for Job {
	async fn run(&self) -> Result<()> {
		let mut job = self.clone();
		let mut scheduler = JobScheduler::new().await?;
		let (tx, mut rx) = mpsc::unbounded_channel();

		let on_job_done: Box<OnJobNotification> = Box::new(move |_, _, _| {
			let cloned_tx = tx.clone();
			Box::pin(async move {
				cloned_tx.clone().send(()).unwrap();
			})
		});

		job.on_done_notification_add(&scheduler, on_job_done).await?;

		scheduler.add(job).await?;
		scheduler.start().await?;
		rx.recv().await; // Wait for job completion
		scheduler.shutdown().await?;

		Ok(())
	}
}
