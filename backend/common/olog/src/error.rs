/// Constructs an event at the error level.
///
/// This functions similarly to the [`tracing::error!`] macro. However, the current trace_id and
/// span_id are automatically added as fields.
///
/// # Examples
///
/// ```
/// use olog::error;
///
/// let (err_info, port) = ("No connection", 22);
///
/// error!(port, error = %err_info);
/// error!(target: "app_events", "App Error: {}", err_info);
/// error!({ info = err_info }, "error on port: {}", port);
/// ```
#[macro_export]
macro_rules! error {
	// With target and parent
	(target: $target:expr, parent: $parent:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::ERROR, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, parent: $parent:expr, $($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::ERROR, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, ?$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::ERROR, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, %$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::ERROR, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, $($arg:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::ERROR, {trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!() }, $($arg)+)
    );
    // With parent only
    (parent: $parent:expr, { $($field:tt)+ }, $($arg:tt)+ ) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::ERROR,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)+ },
            $($arg)+
        )
    );
    (parent: $parent:expr, $($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::ERROR,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::ERROR,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+ =