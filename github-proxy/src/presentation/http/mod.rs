use anyhow::Result;

mod config;
mod routes;

pub async fn serve() -> Result<()> {
	let _ = rocket::custom(config::get())
		.mount(
			"/",
			routes![
				routes::graphql::graphiql,
				routes::graphql::get,
				routes::graphql::post
			],
		)
		.launch()
		.await?;
	Ok(())
}
