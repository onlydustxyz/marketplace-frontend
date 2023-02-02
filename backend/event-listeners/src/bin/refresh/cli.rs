use clap::Parser;
use derive_getters::Dissolve;

/// Refresh any aggregate
#[derive(Parser, Debug, Dissolve)]
#[command(author, about, long_about)]
pub struct Args {
	/// Name of the aggregate
	#[arg(short, long)]
	name: String,

	/// Aggregate ID
	#[arg(short, long)]
	id: String,
}
