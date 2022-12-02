#[macro_export]
macro_rules! trace {
	(target: $target:expr, parent: $parent:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, parent: $parent:expr, $($k:ident).+ $($field:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, ?$($k:ident).+ $($field:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, %$($k:ident).+ $($field:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, $($arg:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::TRACE, {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() }, $($arg)+)
    );
    (parent: $parent:expr, { $($field:tt)+ }, $($arg:tt)+ ) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)+ },
            $($arg)+
        )
    );
    (parent: $parent:expr, $($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, $($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, $($arg:tt)+) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::TRACE,
            {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() },
            $($arg)+
        )
    );
    (target: $target:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, $($k:ident).+ $($field:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)* })
    );
    (target: $target:expr, ?$($k:ident).+ $($field:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ $($field)* })
    );
    (target: $target:expr, %$($k:ident).+ $($field:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::TRACE, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)* })
    );
    (target: $target:expr, $($arg:tt)+ ) => (
        tracing::event!(target: $target, tracing::Level::TRACE, {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() }, $($arg)+)
    );
    ({ $($field:tt)+ }, $($arg:tt)+ ) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)+ },
            $($arg)+
        )
    );
    ($($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ = $($field)*}
        )
    );
    (?$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ = $($field)*}
        )
    );
    (%$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ = $($field)*}
        )
    );
    ($($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+, $($field)*}
        )
    );
    (?$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+, $($field)*}
        )
    );
    (%$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+, $($field)*}
        )
    );
    (?$($k:ident).+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ }
        )
    );
    (%$($k:ident).+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ }
        )
    );
    ($($k:ident).+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ }
        )
    );
	($($arg:tt)+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::TRACE,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!() },
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
