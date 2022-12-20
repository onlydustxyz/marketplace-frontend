/// Constructs an event at the trace level.
///
/// This functions similarly to the [`tracing::trace!`] macro. However, the current trace_id and
/// span_id are automatically added as fields.
///
/// # Examples
///
/// ```rust
/// use olog::trace;
/// # #[derive(Debug, Copy, Clone)] struct Position { x: f32, y: f32 }
/// # impl Position {
/// # const ORIGIN: Self = Self { x: 0.0, y: 0.0 };
/// # fn dist(&self, other: Position) -> f32 {
/// #    let x = (other.x - self.x).exp2(); let y = (self.y - other.y).exp2();
/// #    (x + y).sqrt()
/// # }
/// # }
/// # fn main() {
/// let pos = Position { x: 3.234, y: -1.223 };
/// let origin_dist = pos.dist(Position::ORIGIN);
///
/// trace!(position = ?pos, ?origin_dist);
/// trace!(
///     target: "app_events",
///     position = ?pos,
///     "x is {} and y is {}",
///     if pos.x >= 0.0 { "positive" } else { "negative" },
///     if pos.y >= 0.0 { "positive" } else { "negative" }
/// );
/// # }
/// ```
#[macro_export]
macro_rules! trace {
	(target: $target:expr, parent: $parent:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, parent: $parent:expr, $($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, ?$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, %$($k:ident).+ $($field:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, $($arg:tt)+ ) => (
        $crate::tracing::event!(target: $target, parent: $parent, $crate::tracing::Level::TRACE, {trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!() }, $($arg)+)
    );
    (parent: $parent:expr, { $($field:tt)+ }, $($arg:tt)+ ) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)+ },
            $($arg)+
        )
    );
    (parent: $parent:expr, $($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), %$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, $($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), %$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, $($arg:tt)+) => (
        $crate::tracing::event!(
            target: module_path!(),
            parent: $parent,
            $crate::tracing::Level::TRACE,
            {trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!() },
            $($arg)+
        )
    );
    (target: $target:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, $($k:ident).+ $($field:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)* })
    );
    (target: $target:expr, ?$($k:ident).+ $($field:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+ $($field)* })
    );
    (target: $target:expr, %$($k:ident).+ $($field:tt)* ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::TRACE, { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ $($field)* })
    );
    (target: $target:expr, $($arg:tt)+ ) => (
        $crate::tracing::event!(target: $target, $crate::tracing::Level::TRACE, {trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!() }, $($arg)+)
    );
    ({ $($field:tt)+ }, $($arg:tt)+ ) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($field)+ },
            $($arg)+
        )
    );
    ($($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ = $($field)*}
        )
    );
    (?$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+ = $($field)*}
        )
    );
    (%$($k:ident).+ = $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), %$($k).+ = $($field)*}
        )
    );
    ($($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+, $($field)*}
        )
    );
    (?$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+, $($field)*}
        )
    );
    (%$($k:ident).+, $($field:tt)*) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), %$($k).+, $($field)*}
        )
    );
    (?$($k:ident).+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), ?$($k).+ }
        )
    );
    (%$($k:ident).+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), %$($k).+ }
        )
    );
    ($($k:ident).+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!(), $($k).+ }
        )
    );
	($($arg:tt)+) => (
        $crate::tracing::event!(
            target: module_path!(),
            $crate::tracing::Level::TRACE,
            { trace_id = $crate::trace_id_str!(), span_id = $crate::span_id_str!() },
            $($arg)+
        )
    );
}

#[cfg(test)]
mod tests {
	use tracing::Level;

	#[test]
	fn trace() {
		trace!(foo = ?3, bar.baz = %2, quux = false);
		trace!(foo = 3, bar.baz = 2, quux = false);
		trace!(foo = 3, bar.baz = 3,);
		trace!("foo");
		trace!("foo: {}", 3);
		trace!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
		trace!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
		trace!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
		trace!({ foo = 3, bar.baz = 80 }, "quux");
		trace!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
		trace!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
		trace!({ foo = 2, bar.baz = 78 }, "quux");
		trace!({ foo = ?2, bar.baz = %78 }, "quux");
		trace!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
		trace!(target: "foo_events", foo = 3, bar.baz = 3,);
		trace!(target: "foo_events", "foo");
		trace!(target: "foo_events", "foo: {}", 3);
		trace!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
		trace!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
		trace!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
		false);
		trace!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
		let foo = 1;
		trace!(?foo);
		trace!(%foo);
		trace!(foo);
		trace!(target: "foo_events", ?foo);
		trace!(target: "foo_events", %foo);
		trace!(target: "foo_events", foo);
		trace!(target: "foo_events", ?foo, true, "message");
		trace!(target: "foo_events", %foo, true, "message");
		trace!(target: "foo_events", foo, true, "message");
	}

	#[test]
	fn trace_inside_span() {
		let span = tracing::span!(Level::TRACE, "my span");
		let _enter = span.enter();
		trace();
	}
}
