/// Constructs an event at the info level.
///
/// This functions similarly to the [`tracing::info!`] macro. However, the current trace_id and
/// span_id are automatically added as fields.
///
/// # Examples
///
/// ```rust
/// use olog::info;
/// # // this is so the test will still work in no-std mode
/// # #[derive(Debug)]
/// # pub struct Ipv4Addr;
/// # impl Ipv4Addr { fn new(o1: u8, o2: u8, o3: u8, o4: u8) -> Self { Self } }
/// # fn main() {
/// # struct Connection { port: u32, speed: f32 }
/// use tracing::field;
///
/// let addr = Ipv4Addr::new(127, 0, 0, 1);
/// let conn = Connection { port: 40, speed: 3.20 };
///
/// info!(conn.port, "connected to {:?}", addr);
/// info!(
///     target: "connection_events",
///     ip = ?addr,
///     conn.port,
///     ?conn.speed,
/// );
/// # }
/// ```
#[macro_export]
macro_rules! info {
	(target: $target:expr, parent: $parent:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, parent: $parent:expr, $($k:ident).+ $($field:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, ?$($k:ident).+ $($field:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, %$($k:ident).+ $($field:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)+ })
    );
    (target: $target:expr, parent: $parent:expr, $($arg:tt)+ ) => (
        tracing::event!(target: $target, parent: $parent, tracing::Level::INFO, {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() }, $($arg)+)
    );
    (parent: $parent:expr, { $($field:tt)+ }, $($arg:tt)+ ) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)+ },
            $($arg)+
        )
    );
    (parent: $parent:expr, $($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ = $($field)*}
        )
    );
    (parent: $parent:expr, $($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, ?$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, %$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+, $($field)*}
        )
    );
    (parent: $parent:expr, $($arg:tt)+) => (
        tracing::event!(
            target: module_path!(),
            parent: $parent,
            tracing::Level::INFO,
            {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() },
            $($arg)+
        )
    );
    (target: $target:expr, { $($field:tt)* }, $($arg:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)* }, $($arg)*)
    );
    (target: $target:expr, $($k:ident).+ $($field:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)* })
    );
    (target: $target:expr, ?$($k:ident).+ $($field:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ $($field)* })
    );
    (target: $target:expr, %$($k:ident).+ $($field:tt)* ) => (
        tracing::event!(target: $target, tracing::Level::INFO, { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ $($field)* })
    );
    (target: $target:expr, $($arg:tt)+ ) => (
        tracing::event!(target: $target, tracing::Level::INFO, {trace_id = $crate::trace_id!(), span_id = $crate::span_id!() }, $($arg)+)
    );
    ({ $($field:tt)+ }, $($arg:tt)+ ) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($field)+ },
            $($arg)+
        )
    );
    ($($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ = $($field)*}
        )
    );
    (?$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ = $($field)*}
        )
    );
    (%$($k:ident).+ = $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ = $($field)*}
        )
    );
    ($($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+, $($field)*}
        )
    );
    (?$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+, $($field)*}
        )
    );
    (%$($k:ident).+, $($field:tt)*) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+, $($field)*}
        )
    );
    (?$($k:ident).+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), ?$($k).+ }
        )
    );
    (%$($k:ident).+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), %$($k).+ }
        )
    );
    ($($k:ident).+) => (
        tracing::event!(
            target: module_path!(),
            tracing::Level::INFO,
            { trace_id = $crate::trace_id!(), span_id = $crate::span_id!(), $($k).+ }
        )
    );
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
	use tracing::Level;

	#[test]
	fn info() {
		info!(foo = ?3, bar.baz = %2, quux = false);
		info!(foo = 3, bar.baz = 2, quux = false);
		info!(foo = 3, bar.baz = 3,);
		info!("foo");
		info!("foo: {}", 3);
		info!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
		info!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
		info!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
		info!({ foo = 3, bar.baz = 80 }, "quux");
		info!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
		info!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
		info!({ foo = 2, bar.baz = 78 }, "quux");
		info!({ foo = ?2, bar.baz = %78 }, "quux");
		info!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
		info!(target: "foo_events", foo = 3, bar.baz = 3,);
		info!(target: "foo_events", "foo");
		info!(target: "foo_events", "foo: {}", 3);
		info!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
		info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
		info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
		false);
		info!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
		let foo = 1;
		info!(?foo);
		info!(%foo);
		info!(foo);
		info!(target: "foo_events", ?foo);
		info!(target: "foo_events", %foo);
		info!(target: "foo_events", foo);
		info!(target: "foo_events", ?foo, true, "message");
		info!(target: "foo_events", %foo, true, "message");
		info!(target: "foo_events", foo, true, "message");
	}

	#[test]
	fn info_inside_span() {
		let span = tracing::span!(Level::INFO, "my span");
		let _enter = span.enter();
		info();
	}
}
