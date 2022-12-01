#[macro_export]
macro_rules! info {
	($($arg:tt)+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = olog::trace_id!(), span_id = olog::span_id!() },
            $($arg)+
        )
    );
}
