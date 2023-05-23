/// Wraps communication with a RabbitMQ message broker to create an event bus.
///
/// The `Bus` struct connects to RabbitMQ and creates a channel of communication. It allows for
/// publishing and consuming messages to/from RabbitMQ.
pub struct Bus {
    _connection: Connection,
    channel: Channel,
}

impl Bus {
    /// Initalizes a new event bus by connecting to RabbitMQ and creating a new channel of
    /// communication.
    ///
    /// If it fails to connect to RabbitMQ, it will retry at fixed interval depending on the
    /// configuration.
    ///
    /// In case the connection to RabbitMQ is lost later during the execution of the
    /// application, an error will be logged and the process will exit with code 1.
    ///
    /// The combination of those two behaviors allows us to let Heroku restart the application as
    /// soon as the connection is lost, while ensuring it doesn't crash again when it restarts (in
    /// case RabbitMQ is still not reachable). Not doing the retry would potentially lead the
    /// application to restart early again, and would make us enter the exponential backoff policy
    /// of Heroku (the second restart can be delayed by up to 20 minutes (!!!) by Heroku).
    pub async fn new(config: &Config) -> Result<Self, Error> {
        // Retry strategy
        let retry_strategy = FixedInterval::from_millis(*config.connection_retry_interval_ms())
            .take(*config.connection_retry_count());

        // Connection creation
        let connection = Retry::spawn(retry_strategy, || async {
            Connection::connect(config.url(), Default::default()).await.map_err(|error| {
                error!(
                    "Failed to connect to RabbitMQ: {error:?}. Retrying in {}ms for a maximum of {} attempts.",
                    config.connection_retry_interval_ms(),
                    config.connection_retry_count()
                );
                error
            })
        })
        .await?;

        // On error behavior
        connection.on_error(|error| {
            error!("Lost connection to RabbitMQ: {error:?}");
            std::process::exit(1);
        });

        // Channel creation
        let channel = connection.create_channel().await?;
        Ok(Self {
            _connection: connection,
            channel,
        })
    }

    /// Publishes a message to the specified exchange using the specified routing key. The message
    /// is persisted with a delivery mode of `2` (persistent).
    pub async fn publish(
        &self,
        exchange_name: &str,
        routing_key: &str,
        data: &[u8],
    ) -> Result<Confirmation, Error> {
        let confirmation = self
            .channel
            .basic_publish(
                exchange_name,
                routing_key,
                Default::default(),
                data,
                BasicProperties::default().with_delivery_mode(DELIVERY_MODE_PERSISTENT),
            )
            .await?
            .await?;

        Ok(confirmation)
    }

    /// Creates a new consumable bus by creating a queue with the specified name and options, and
    /// returning an instance of `ConsumableBus`.
    pub async fn with_queue(
        self,
        queue_name: String,
        options: QueueDeclareOptions,
    ) -> Result<ConsumableBus, Error> {
        self.channel
            .queue_declare(&queue_name, options, Default::default())
            .await?;
        ConsumableBus::new(self, queue_name).await
    }
}

/// Allows consumption of messages from RabbitMQ.
pub struct ConsumableBus {
    bus: Bus,
    queue_name: String,
    consumer: RwLock<Consumer>,
}

impl ConsumableBus {
    /// Creates a new consumable bus by creating a queue with the specified name and options. The
    /// provided `Bus` instance is used to connect to RabbitMQ.
    pub async fn new(bus: Bus, queue_name: String) -> Result<Self, Error> {
        let consumer = bus
            .channel
            .basic_consume(&queue_name, "", Default::default(), Default::default())
            .await?;

        Ok(Self {
            bus,
            queue_name,
            consumer: RwLock::new(consumer),
        })
    }

    /// Returns the queue name associated with the bus.
    pub fn queue_name(&self) -> &str {
        &self.queue_name
    }

    /// Binds a queue to the specified exchange using a "fanout" exchange type. Returns the updated
    /// `ConsumableBus` instance.
    pub async fn with_exchange(self, exchange_name: &'static str) -> Result<Self, Error> {
        self.bus
            .channel
            .exchange_declare(
                exchange_name,
                lapin::ExchangeKind::Fanout,
                ExchangeDeclareOptions {
                    durable: true,
                    ..Default::default()
                },
                Default::default(),
            )
            .await?;

        self.bus
            .channel
            .queue_bind(
                &self.queue_name,
                exchange_name,
                "",
                Default::default(),
                Default::default(),
            )
            .await?;

        Ok(self)
    }

    /// Consumes the next available message from RabbitMQ, and returns it wrapped in an `Option`.
    /// Returns `None` if there are no messages to consume.
    pub async fn consume(&self) -> Result<Option<Delivery>, Error> {
        match self.consumer.write().await.next().await {
            Some(Ok(delivery)) => Ok(Some(delivery)),
            Some(Err(error)) => Err(error.into()),
            None => Ok(None),
        }
    }
}

/// An error that can be raised while interfacing with RabbitMQ.
#[derive(Debug, Error)]
pub enum Error {
    /// A wrapped error of type `lapin::Error`.
    #[error(transparent)]
    Amqp(#[from] lapin::Error),
}