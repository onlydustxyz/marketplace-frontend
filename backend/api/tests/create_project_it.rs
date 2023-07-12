#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use rocket::local::blocking::Client;
    use testcontainers::clients::Cli;
    use testcontainers::core::WaitFor;
    use testcontainers::images::generic::GenericImage;
    use url::Url;

    use api::Config;
    use api::infrastructure::simple_storage;
    use api::presentation::bootstrap::bootstrap;
    use infrastructure::{amqp, database, graphql, tracing, web3};
    use presentation::http;

    #[actix_rt::test]
    pub async fn should_create_project() {
        let postgres_db = "marketplace_db".to_string();
        let postgres_user = "postgres".to_string();
        let postgres_password = "Passw0rd".to_string();
        let postgres_image = GenericImage::new("postgres", "14.3-alpine")
            .with_env_var("POSTGRES_DB".to_string(), &postgres_db)
            .with_env_var("POSTGRES_USER".to_string(), &postgres_user)
            .with_env_var("POSTGRES_PASSWORD".to_string(), &postgres_password)
            .with_env_var("POSTGRES_HOST_AUTH_METHOD".to_string(), "trust".to_string())
            .with_volume("/Users/ilysse/Workspace/ONLYDUST/marketplace/backend/api/tests/resources".to_string(),
                         "/docker-entrypoint-initdb.d".to_string())
            .with_wait_for(WaitFor::StdOutMessage {
                message: "database system is ready to accept connections".to_string(),
            });
        let client = Cli::docker();
        let postgres_container = client.run(postgres_image);
        let postgres_port = postgres_container.ports().map_to_host_port_ipv4(5432).unwrap();

        let database_url = format!(
            "postgres://{}:{}@{}:{}/{}",
            &postgres_user,
            &postgres_password,
            "localhost".to_string(),
            &postgres_port,
            &postgres_db
        );

        // let hasura_auth_runnable_image = RunnableImage::from(RunnableImage::from(GenericImage::new("onlydustxyz/hasura-auth", "latest")
        //     .with_env_var("HASURA_GRAPHQL_DATABASE_URL", &database_url)
        //     .with_env_var("HASURA_GRAPHQL_JWT_SECRET", "{\"type\":\"HS256\",\"key\":\"5152fa850c02dc222631cca898ed1485821a70912a6e3649c49076912daa3b62182ba013315915d64f40cddfbb8b58eb5bd11ba225336a6af45bbae07ca873f3\",\"issuer\":\"hasura-auth\"}")
        //     .with_env_var("HASURA_GRAPHQL_GRAPHQL_URL","http://graphql-engine:8080/v1/graphql")
        //     .with_env_var("HASURA_GRAPHQL_ADMIN_SECRET","HASURA_GRAPHQL_ADMIN_SECRET")
        //     .with_wait_for(WaitFor::StdOutMessage { message: "{\"level\":\"info\",\"message\":\"Metadata applied\"".to_string() })))
        //     .with_network(network.to_string());
        // {
        //     let _ = client.run(hasura_auth_runnable_image);
        // }

        // let database_url = format!(
        // 	"postgres://{}:{}@{}:{}/{}",
        // 	"postgres".to_string(),
        // 	"postgres".to_string(),
        // 	"localhost".to_string(),
        // 	5432,
        // 	"marketplace_db".to_string()
        // );


        println!("Starting app on database {}", &database_url);

        let database_config = database::Config {
            url: database_url,
            pool_max_size: 2,
        };
        let amqp_config = amqp::Config { url: "".to_string(), connection_retry_count: 100, connection_retry_interval_ms: 6000 };
        let tracer_config = tracing::Config { ansi: false, json: true, location: true };
        let web3_config = web3::Config { url: "".to_string() };
        let s3_config = simple_storage::Config { images_bucket_name: "".to_string(), bucket_region: "".to_string() };
        let graphql_config = graphql::Config { base_url: Url::parse(&("https://test.com".to_string())).unwrap(), headers: HashMap::new() };
        let config: Config = Config {
            http: http::Config { api_keys: HashMap::new() },
            database: database_config,
            amqp: amqp_config,
            tracer: tracer_config,
            github: Default::default(),
            web3: web3_config,
            s3: s3_config,
            graphql_client: graphql_config,
        };
        let rocket_builder = bootstrap(config).await.unwrap();

        let _client = Client::tracked(rocket_builder).expect("valid rocket instance");

        println!("3");
    }
}
