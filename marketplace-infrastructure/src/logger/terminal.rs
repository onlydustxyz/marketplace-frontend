use slog::Drain;
use slog_term::{FullFormat, TermDecorator};

pub fn drain() -> impl Drain<Ok = (), Err = slog::Never> {
	FullFormat::new(TermDecorator::new().stdout().build())
		.use_utc_timestamp()
		.build()
		.fuse()
}
