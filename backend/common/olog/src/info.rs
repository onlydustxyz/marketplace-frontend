/// This macro constructs an event at the info level.
///
/// This functions similarly to the [`tracing::info!`] macro. However, the current trace_id and
/// span_id are automatically added as fields.
///
/// # Examples
///
/// ```
/// use olog::info;
///
/// struct Connection { port: u32, speed: f32 }
///
/// let addr = Ipv4Addr::new(127, 0, 0, 1);
/// let conn = Connection { port: 40, speed: 3.20 };
///
/// info!(conn.port, "connected to {:?}", addr);
/// info!(target: "connection_events", ip = ?addr, conn.port, ?conn.speed);
///
/// // Macro supports various ways of defining structured events:
///
/// // Named fields
/// info!(foo = ?3, bar.baz = %2, quux = false);
///
/// // Positional fields
/// info!(foo = 3, bar.baz = 2, quux = false);
/// info!(foo = 3, bar.baz = 3,);
///
/// // Message only
/// info!("foo");
/// info!("foo: {}", 3);
///
/// // Mixed message and fields
/// info!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
///
/// // Positional message
/// info!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
/// info!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
///
/// // Structured fields
/// info!({ foo = 3, bar.baz = 80 }, "quux");
///
/// // Structured fields with positional message
/// info!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
/// info!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
///
/// // Structured event (no positional or named message)
/// info!({ foo = 2, bar.baz = 78 }, "quux");
/// info!({ foo = ?2, bar.baz = %78 }, "quux");
///
/// // Targeted logging
/// info!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
/// info!(target: "foo_events", foo = 3, bar.baz = 3,);
/// info!(target: "foo_events", "foo");
/// info!(target: "foo_events", "foo: {}", 3);
/// info!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
/// info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
/// info!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
/// false);
/// info!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
///
/// // Field shorthand notation
/// let foo = 1;
/// info!(?foo);
/// info!(%foo);
/// info!(foo);
/// info!(target: "foo_events", ?foo);
/// info!(target: "foo_events", %foo);
/// info