use anyhow::Result;
use warp::Filter;

use super::graphql;

pub fn port() -> Result<u16> {
	let port = std::env::var("WEBSERVER_PORT").unwrap_or_else(|_| 8081.to_string()).parse()?;
	Ok(port)
}

pub async fn server<F>(port: u16, context_maker: F)
where
	F: Fn() -> graphql::Context + Clone + Send + Sync + 'static,
{
	let state = warp::any().map(context_maker);
	let graphql_filter = juniper_warp::make_graphql_filter(graphql::create_schema(), state.boxed());

	warp::serve(
		warp::get()
			.and(warp::path("graphiql"))
			.and(juniper_warp::graphiql_filter("/graphql", None))
			.or(warp::path("graphql").and(graphql_filter)),
	)
	.run(([0, 0, 0, 0], port))
	.await
}
