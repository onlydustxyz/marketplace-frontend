/// A trait that provides a `filter_with` method to filter a stream using a filter.
pub trait StreamFilterWith: futures::Stream
where
    Self: Sized,
{
    /// Filters the stream using the provided filter and returns a new `FilterWith` stream.
    fn filter_with(
        self,
        filters: std::sync::Arc<dyn Filter<I = Self::Item>>,
    ) -> FilterWith<Self> {
        FilterWith::new(self, filters)
    }
}

impl<S: futures::Stream> StreamFilterWith for S {}

/// A stream that filters items using a filter.
#[pin_project_lite::pin_project]
#[derive(derive_more::Constructor)]
#[must_use = "streams do nothing unless polled"]
pub struct FilterWith<St: futures::Stream> {
    #[pin]
    stream: St,
    filters: std::sync::Arc<dyn Filter<I = St::Item>>,
}

/// A trait that defines a filter for a stream.
pub trait Filter: Send + Sync {
    type I;
    /// Filters the given item and returns a `Decision`.
    fn filter(&self, item: Self::I) -> Decision<Self::I>;
}

/// An enum that represents the decision made by the filter.
#[derive(Default, Debug, PartialEq, Eq)]
pub enum Decision<I> {
    /// Indicates that the item should be taken.
    Take(I),
    /// Indicates that the item should be skipped.
    Skip,
    /// Indicates the end of the stream has been reached.
    #[default]
    End,
}

impl<I, St: futures::Stream<Item = I>> futures::Stream for FilterWith<St> {
    type Item = I;

    /// Polls the next item from the stream and returns a `Poll` containing either the next item,
    /// or a `Decision` made by the filter.
    fn poll_next(
        self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Option<St::Item>> {
        let mut this = self.project();
        std::task::Poll::Ready(loop {
            let next = futures::ready!(this.stream.as_mut().poll_next(cx));
            match next.map(|item| this.filters.filter(item)).unwrap_or_default() {
                Decision::Take(item) => break Some(item),
                Decision::Skip => continue,
                Decision::End => break None,
            }
        })
    }

    /// Returns the size hint of the underlying stream.
    fn size_hint(&self) -> (usize, Option<usize>) {
        self.stream.size_hint()
    }
}