/// Constructs an event at the warn level.
///
/// This functions similarly to the [`tracing::warn!`] macro. However, the current trace_id and
/// span_id are automatically added as fields.
///
/// # Examples
///
/// ```rust
/// use olog::warn;
/// # fn main() {
///
/// let warn_description = "Invalid Input";
/// let input = &[0x27, 0x45];
///
/// warn!(?input, warning = warn_description);
/// warn!(
///     target: "input_events",
///     warning = warn_description,
///     "Received warning for input: {:?}", input,
/// );
/// # }
/// ```
#[macro_export]
macro_rules! warn {
	/// Constructs an event with specified log level, module path, and additional fields
	///
	/// This macro is used to create a log message at the level `warn` using the specified `target` and `parent`. Fields of this message are defined using the syntax `foo = bar`, where `foo` is the field name and `bar` is the field value. Values can be of many different types, including numbers and strings. Additionally, if you prefix the value with `?`, it formats the value using [`std::fmt::Debug`], and if you prefix it with `%`, it formats the value using [`std::fmt::Display`]. If you want to use a type that doesn't implement either of those traits, wrap the value in quotes and use the `?` prefix.
	///
	/// # Examples
	///
	/// ```
	/// # use olog::warn;
	/// # fn my_error_condition() -> bool { true }
	/// let file_size = 1024 * 1024; // in bytes
	/// let descriptive_phrase = "some problem has occurred!";
	///
	/// warn!(
	///     filesize = file_size,
	///     error = descriptive_phrase,
	///     "error processing file; continuing"
	/// );
	///
	/// // Conditionally including a field
	/// warn!(
	///     filesize = file_size,
	///     ?error = if my_error_condition() { Some(descriptive_phrase) } else { None },
	///     "processed file"
	/// )
	/// ```
	(target: $target:expr, parent: $parent:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::WARN, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, parent: $parent:expr, $($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::WARN, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, ?$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::WARN, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, %$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::WARN, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+