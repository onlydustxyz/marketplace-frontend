use std::{
	pin::Pin,
	task::{Context, Poll},
};

use derive_more::Constructor;
use domain::GithubServiceFilters;
use futures::{ready, Stream};
use pin_project_lite::pin_project;

mod pulls;

pub trait StreamFilterWith: Stream
where
	Self: Sized,
{
	fn filter_with(self, filters: GithubServiceFilters) -> FilterWith<Self> {
		FilterWith::new(self, filters)
	}
}

impl<S: Stream> StreamFilterWith for S {}

pin_project! {
	#[derive(Constructor)]
	#[must_use = "streams do nothing unless polled"]
	pub struct FilterWith<St: Stream>
	{
		#[pin]
		stream: St,
		filters: GithubServiceFilters,
	}
}

#[derive(Default)]
enum Decision<I> {
	Take(I), // Item is valid, take it
	Skip,    // Item is not valid, keep looking
	#[default]
	End, // Item is not valid, neither are the rest. End of the stream.
}

trait Filter: Sized {
	fn filter(self, filters: &GithubServiceFilters) -> Decision<Self>;
}

impl<St: Stream<Item = Item>, Item: Filter> Stream for FilterWith<St> {
	type Item = St::Item;

	fn poll_next(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<St::Item>> {
		let mut this = self.project();

		Poll::Ready(loop {
			let next = ready!(this.stream.as_mut().poll_next(cx));
			match next.map(|item| item.filter(&this.filters)).unwrap_or_default() {
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
