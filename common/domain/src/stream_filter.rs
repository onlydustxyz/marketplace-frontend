pub trait StreamFilterWith: futures::Stream
where
	Self: Sized,
{
	fn filter_with(self, filters: std::sync::Arc<dyn Filter<I = Self::Item>>) -> FilterWith<Self> {
		FilterWith::new(self, filters)
	}
}

impl<S: futures::Stream> StreamFilterWith for S {}

pin_project_lite::pin_project! {
  #[derive(derive_more::Constructor)]
  #[must_use = "streams do nothing unless polled"]
  pub struct FilterWith<St:futures::Stream>{
	#[pin]stream:St,
	filters:std::sync::Arc<dyn Filter<I=St::Item>> ,
  }
}

pub trait Filter: Send + Sync {
	type I;
	fn filter(&self, item: Self::I) -> Decision<Self::I>;
}

#[derive(Default, Debug, PartialEq, Eq)]
pub enum Decision<I> {
	Take(I),
	Skip,
	#[default]
	End,
}

impl<I, St: futures::Stream<Item = I>> futures::Stream for FilterWith<St> {
	type Item = I;

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

	fn size_hint(&self) -> (usize, Option<usize>) {
		self.stream.size_hint()
	}
}
