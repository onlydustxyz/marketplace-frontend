#[macro_export]
macro_rules! info {
	($($arg:tt)+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!() },
            $($arg)+
        )
    );
}

#[cfg(test)]
mod tests {
	use opentelemetry::sdk::export::trace::stdout;
	use tracing::Level;
	use tracing_subscriber::prelude::__tracing_subscriber_SubscriberExt;

	#[ctor::ctor]
	fn init() {
		let tracer = stdout::new_pipeline().install_simple();
		let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);

		let subscriber = tracing_subscriber::fmt::Subscriber::builder()
			.with_ansi(std::env::var("ANSI_LOGS").and(Ok(true)).unwrap_or(false))
			.finish()
			.with(telemetry);

		// Trace executed code
		tracing::subscriber::set_global_default(subscriber).unwrap();
	}

	#[test]
	fn info() {
		// info!(foo = ?3, bar.baz = %2, quux = false);
		// info!(foo = 3, bar.baz = 2, quux = false);
		// info!(foo = 3, bar.baz = 3,);
		info!("foo");
		info!("foo: {}", 3);
		// info!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
		// info!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
		// info!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
		// info!({ foo = 3, bar.baz = 80 }, "quux");
		// info!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
		// info!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
		// info!({ foo = 2, bar.baz = 78 }, "quux");
		// info!({ foo = ?2, bar.baz = %78 }, "quux");
		// info!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
		// info!(target: "foo_events", foo = 3, bar.baz = 3,);
		// info!(target: "foo_events", "foo");
		// info!(target: "foo_events", "foo: {}", 3);
		// info!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
		// info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
		// info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
		// false); info!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
		// let foo = 1;
		// info!(?foo);
		// info!(%foo);
		// info!(foo);
		// info!(target: "foo_events", ?foo);
		// info!(target: "foo_events", %foo);
		// info!(target: "foo_events", foo);
		// info!(target: "foo_events", ?foo, true, "message");
		// info!(target: "foo_events", %foo, true, "message");
		// info!(target: "foo_events", foo, true, "message");
	}

	#[test]
	fn info_inside_span() {
		let span = tracing::span!(Level::INFO, "my span");
		let _enter = span.enter();

		// info!(foo = ?3, bar.baz = %2, quux = false);
		// info!(foo = 3, bar.baz = 2, quux = false);
		// info!(foo = 3, bar.baz = 3,);
		info!("foo");
		info!("foo: {}", 3);
		// info!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
		// info!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
		// info!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
		// info!({ foo = 3, bar.baz = 80 }, "quux");
		// info!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
		// info!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
		// info!({ foo = 2, bar.baz = 78 }, "quux");
		// info!({ foo = ?2, bar.baz = %78 }, "quux");
		// info!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
		// info!(target: "foo_events", foo = 3, bar.baz = 3,);
		// info!(target: "foo_events", "foo");
		// info!(target: "foo_events", "foo: {}", 3);
		// info!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
		// info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
		// info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
		// false); info!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
		// let foo = 1;
		// info!(?foo);
		// info!(%foo);
		// info!(foo);
		// info!(target: "foo_events", ?foo);
		// info!(target: "foo_events", %foo);
		// info!(target: "foo_events", foo);
		// info!(target: "foo_events", ?foo, true, "message");
		// info!(target: "foo_events", %foo, true, "message");
		// info!(target: "foo_events", foo, true, "message");
	}
}
