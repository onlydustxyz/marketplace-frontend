/// Constructs an event at the debug level.
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
	(target: $target:expr, parent: $parent:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, parent: $parent:expr, $($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, ?$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, %$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, $($arg:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::DEBUG, {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() }, $($arg)+)
    );
    (parent: $parent:expr, { $($field:tt)+ }, $($arg:tt)+ ) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)+ },
            $($arg)+
        )
    );
    (parent: $parent:expr, $($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, $($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, $($arg:tt)+) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::DEBUG,
            {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() },
            $($arg)+
        )
    );
    (target: $target:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, $($k:ident).+ $($field:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)* })
    );
    (target: $target:expr, ?$($k:ident).+ $($field:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ $($field)* })
    );
    (target: $target:expr, %$($k:ident).+ $($field:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::DEBUG, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)* })
    );
    (target: $target:expr, $($arg:tt)+ ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::DEBUG, {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() }, $($arg)+)
    );
    ({ $($field:tt)+ }, $($arg:tt)+ ) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)+ },
            $($arg)+
        )
    );
    ($($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ = $($field)*}
        )
    );
    (?$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ = $($field)*}
        )
    );
    (%$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ = $($field)*}
        )
    );
    ($($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+, $($field)*}
        )
    );
    (?$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+, $($field)*}
        )
    );
    (%$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+, $($field)*}
        )
    );
    (?$($k:ident).+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ }
        )
    );
    (%$($k:ident).+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ }
        )
    );
    ($($k:ident).+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ }
        )
    );
	($($arg:tt)+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::DEBUG,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!() },
            $($arg)+
        )
    );
}

#[cfg(test)]
mod tests {
	use tracing::Level;

	#[test]
	fn debug() {
		debug!(foo = ?3, bar.baz = %2, quux = false);
		debug!(foo = 3, bar.baz = 2, quux = false);
		debug!(foo = 3, bar.baz = 3,);
		debug!("foo");
		debug!("foo: {}", 3);
		debug!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
		debug!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
		debug!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
		debug!({ foo = 3, bar.baz = 80 }, "quux");
		debug!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
		debug!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
		debug!({ foo = 2, bar.baz = 78 }, "quux");
		debug!({ foo = ?2, bar.baz = %78 }, "quux");
		debug!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
		debug!(target: "foo_events", foo = 3, bar.baz = 3,);
		debug!(target: "foo_events", "foo");
		debug!(target: "foo_events", "foo: {}", 3);
		debug!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
		debug!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
		debug!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
		false);
		debug!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
		let foo = 1;
		debug!(?foo);
		debug!(%foo);
		debug!(foo);
		debug!(target: "foo_events", ?foo);
		debug!(target: "foo_events", %foo);
		debug!(target: "foo_events", foo);
		debug!(target: "foo_events", ?foo, true, "message");
		debug!(target: "foo_events", %foo, true, "message");
		debug!(target: "foo_events", foo, true, "message");
	}

	#[test]
	fn debug_inside_span() {
		let span = tracing::span!(Level::DEBUG, "my span");
		let _enter = span.enter();
		debug();
	}
}
