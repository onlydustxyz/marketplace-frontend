use rstest::fixture;
use testcontainers::clients::Cli;

pub mod database;

#[fixture]
#[once]
fn docker() -> Cli {
	Cli::docker()
}
