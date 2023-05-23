/// A macro that constructs an event at the trace level. The current trace_id and span_id are
/// automatically added as fields for observability purposes.
///
/// This macro extends the functionality of [`tracing::event!`] macro with more convenient short-hand
/// notations that allow for passing in `Debug` or `Display` formatted values and avoid the need to
/// manually add `trace_id` and `span_id` fields to events. Users only need to define fields specific
/// to their use-case and the macro will automatically add the additional fields.
///
/// # Examples
///
/// ```
/// use olog::trace;
///
/// trace!(foo = ?3, bar.baz = %2, quux = false);
/// trace!(foo = 3, bar.baz = 2, quux = false);
/// trace!(foo = 3, bar.baz = 3,);
/// trace!("foo");
/// trace!("foo: {}", 3);
/// trace!(foo = ?3, bar.baz = %2, quux = false, "hello world {:?}", 42);
/// trace!(foo = 3, bar.baz = 2, quux = false, "hello world {:?}", 42);
/// trace!(foo = 3, bar.baz = 3, "hello world {:?}", 42,);
/// trace!({ foo = 3, bar.baz = 80 }, "quux");
/// trace!({ foo = 2, bar.baz = 79 }, "quux {:?}", true);
/// trace!({ foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux = false);
/// trace!({ foo = 2, bar.baz = 78 }, "quux");
/// trace!({ foo = ?2, bar.baz = %78 }, "quux");
/// trace!(target: "foo_events", foo = 3, bar.baz = 2, quux = false);
/// trace!(target: "foo_events", foo = 3, bar.baz = 3,);
/// trace!(target: "foo_events", "foo");
/// trace!(target: "foo_events", "foo: {}", 3);
/// trace!(target: "foo_events", { foo = 3, bar.baz = 80 }, "quux");
/// trace!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}", true);
/// trace!(target: "foo_events", { foo = 2, bar.baz = 79 }, "quux {:?}, {quux}", true, quux =
/// false);
/// trace!(target: "foo_events", { foo = 2, bar.baz = 78, }, "quux");
///
/// let foo = 1;
/// trace!(?foo);
/// trace!(%foo);
/// trace!(foo);
/// trace!(target: "foo_events", ?foo);
/// trace!(target: "foo_events", %foo);
/// trace!(target: "foo_events", foo);
/// trace!(target: "foo_events", ?foo, true, "message");
/// trace!(target: "foo_events", %foo, true, "message");
/// trace!(target: "foo_events", foo, true