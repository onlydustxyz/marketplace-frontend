use futures::{stream::LocalBoxStream, Stream, StreamExt};

pub mod fetcher;
pub mod logger;

pub type LocalBoxIterator<'a, Output> = Box<dyn Iterator<Item = Output> + 'a>;
pub struct StreamableSync<'a, Output>(LocalBoxIterator<'a, Output>);
pub struct StreamableAsync<'a, Output>(pub LocalBoxStream<'a, Output>);

pub enum Streamable<'a, Output> {
    Sync(StreamableSync<'a, Output>),
    Async(StreamableAsync<'a, Output>),
}

impl<'a, Iter, Output> From<Iter> for StreamableSync<'a, Output>
where
    Iter: Iterator<Item = Output> + 'a,
{
    fn from(iter: Iter) -> Self {
        Self(Box::new(iter))
    }
}

impl<'a, Stream_, Output> From<Stream_> for StreamableAsync<'a, Output>
where
    Stream_: Stream<Item = Output> + 'a,
{
    fn from(stream: Stream_) -> Self {
        Self(stream.boxed_local())
    }
}

impl<Item> Stream for Streamable<'_, Item> {
    type Item = Item;

    fn poll_next(
        self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Option<Self::Item>> {
        match self.get_mut() {
            Self::Sync(iter) => std::task::Poll::Ready(iter.0.next()),
            Self::Async(stream) => stream.0.poll_next_unpin(cx),
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        match self {
            Self::Sync(iter) => iter.0.size_hint(),
            Self::Async(stream) => stream.0.size_hint(),
        }
    }
}
