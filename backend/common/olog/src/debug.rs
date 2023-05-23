/// Macro for constructing an event at the debug level.
///
/// This functions similarly to the [`tracing::debug!`] macro. However, the current trace_id and
/// span_id are automatically added as fields.
///
/// # Examples
///
/// ```rust
/// use olog::debug;
/// # fn main() {
/// # #[derive(Debug)] struct Position { x: f32, y: f32 }
///
/// let pos = Position { x: 3.234, y: -1.223 };
///
/// debug!(?pos.x, ?pos.y);
/// debug!(target: "app_events", position = ?pos, "New position");
/// # }
/// ```
#[macro_export]
macro_rules! debug {
	/// Constructs a debug event with a target and parent span.
	///
	/// # Examples
	///
	/// ```rust
	/// # fn main() -> Result<(), Box<dyn std::error::Error>>{
	/// use tracing::{trace, Level};
	///
	/// let parent_span = span!(Level::TRACE, "parent");
	/// let _enter = parent_span.enter();
	///
	/// let my_span = span!(Level::DEBUG, "debug");
	///
	/// let _enter = my_span.enter();
	///
	/// olog::debug!(target: "my_app", parent: &my_span, "debug message");
	///
	/// Ok(())
	/// # }
	/// ```
	(target: $target:expr, parent: $parent:expr, $($arg:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!() }, $($arg)+)
    );
	/// Constructs a debug event with a target and fields.
	///
	/// # Examples
	///
	/// ```rust
	/// olog::debug!(target: "my_app", message = "some debug message", id = 10);
	/// ```
	(target: $target:expr, $($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
	/// Constructs a debug event with fields and debug formatted values.
	///
	/// # Examples
	///
	/// ```rust
	/// let value = 42;
	/// olog::debug!("this is a debug {}", value);
	///
	/// olog::debug!(
	///     id = 1,
	///     message = "debug message {:?}",
	///     ?value
	/// );
	/// ```
	($($k:ident).+, $($field:tt)+ ) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+, $($field)+ }
        )
    );
	/// Constructs a debug event with fields.
	///
	/// # Examples
	///
	/// ```rust
	/// olog::debug!(message = "debug message");
	///
	/// olog::debug!(
	///     id = 1,
	///     message = "debug message",
	/// );
	/// ```
	({ $($field:tt)+ }) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)+ }
        )
    );
	/// Constructs a debug event with debug formatted values.
	///
	/// # Examples
	///
	/// ```rust
	/// let value = 42;
	/// olog::debug!("