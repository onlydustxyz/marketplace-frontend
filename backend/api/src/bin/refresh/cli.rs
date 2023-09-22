use clap::{ArgGroup, Parser};

/// Refresh any aggregate
#[derive(Parser, Debug)]
#[command(author, about, long_about)]
#[command(group(ArgGroup::new("ids").required(true).args(["id", "all"]),
))]
pub struct Args {
	/// Name of the aggregate
	#[arg(short, long)]
	pub name: String,

	/// Aggregate ID
	#[arg(short, long)]
	pub id: Vec<String>,

	/// Aggregate ID
	#[arg(short, long)]
	pub all: bool,
}
