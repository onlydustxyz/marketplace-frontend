use slog::{Drain, Never};
use slog_async::Async;

pub fn drain<D: Drain<Ok = (), Err = Never> + Send + 'static>(drain: D) -> Async {
	Async::new(drain).chan_size(channel_size()).build()
}

fn channel_size() -> usize {
	std::env::var("SLOG_CHANNEL_SIZE").unwrap_or_default().parse().unwrap_or(256)
}
