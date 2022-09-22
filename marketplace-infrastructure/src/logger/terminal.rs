use slog::Drain;
use slog_term::{CompactFormat, TermDecorator};

pub fn drain() -> impl Drain<Ok = (), Err = slog::Never> {
	CompactFormat::new(TermDecorator::new().stderr().build()).build().fuse()
}
