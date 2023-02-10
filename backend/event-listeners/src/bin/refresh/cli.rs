use clap::{ArgGroup, Parser};
use derive_getters::Dissolve;

/// Refresh any aggregate
#[derive(Parser, Debug, Dissolve)]
#[command(author, about, long_about)]
#[command(group(ArgGroup::new("ids").required(true).args(["id", "all"]),
))]
pub struct Args {
	/// Name of the aggregate
	#[arg(short, long)]
	name: String,

	/// Aggregate ID
	#[arg(short, long)]
	id: Vec<String>,

	/// Aggregate ID
	#[arg(short, long)]
	all: bool,
}
