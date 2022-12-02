use anyhow::Result;

mod config;

pub async fn serve() -> Result<()> {
	let _ = rocket::custom(config::get()).launch().await?;
	Ok(())
}
