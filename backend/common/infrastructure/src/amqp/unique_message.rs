/// A `UniqueMessage` consists of a payload, a unique identifier, a timestamp, metadata, and a trace context.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct UniqueMessage<P> {
    /// A unique identifier.
    id: Uuid,
    /// A timestamp of the current time.
    timestamp: NaiveDateTime,
    /// Metadata.
    metadata: Value,
    /// A payload.
    payload: P,
    /// A trace context.
    trace_context: HashMap<String, String>,
}

impl<P> Extractor for UniqueMessage<P> {
    /// Get a value for a given key from the trace context.
    fn get(&self, key: &str) -> Option<&str> {
        Extractor::get(&self.trace_context, key)
    }

    /// Get all keys from the trace context.
    fn keys(&self) -> Vec<&str> {
        Extractor::keys(&self.trace_context)
    }
}

impl<P: MessagePayload> Message for UniqueMessage<P> {}

impl<P> UniqueMessage<P> {
    /// Creates a new instance of `UniqueMessage`.
    pub fn new(payload: P) -> Self {
        let mut trace_context = HashMap::new();
        TraceContextPropagator::new()
            .inject_context(&Span::current().context(), &mut trace_context);
        Self {
            id: Uuid::new_v4(),
            payload,
            timestamp: Utc::now().naive_utc(),
            metadata: Default::default(),
            trace_context,
        }
    }
}

impl<P: Serialize> Display for UniqueMessage<P> {
    /// Format the `UniqueMessage` as a string for display.
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            serde_json::to_string(self).map_err(|_| std::fmt::Error)?
        )?;
        Ok(())
    }
}