use std::{
	fmt::Debug,
	pin::Pin,
	task::{Context, Poll},
};

use derive_more::Constructor;
use futures::{ready, Stream};
use pin_project_lite::pin_project;

mod contributors;
mod issues;

pub trait StreamFilterWith<F>: Stream
where
	Self: Sized,
{
	fn filter_with(self, filters: F) -> FilterWith<Self, F> {
		FilterWith::new(self, filters)
	}
}

impl<S: Stream, F> StreamFilterWith<F> for S {}

pin_project! {
	#[derive(Constructor)]
	#[must_use = "streams do nothing unless polled"]
	pub struct FilterWith<St: Stream, F>
	{
		#[pin]
		stream: St,
		filters: F,
	}
}

#[derive(Default, Debug, PartialEq, Eq)]
enum Decision<I> {
	Take(I), // Item is valid, take it
	Skip,    // Item is not valid, keep looking
	#[default]
	End, // Item is not valid, neither are the rest. End of the stream.
}

trait Filter<F>: Sized {
	fn filter(self, filters: &F) -> Decision<Self>;
}

impl<F, St: Stream<Item = Item>, Item: Filter<F>> Stream for FilterWith<St, F> {
	type Item = St::Item;

	fn poll_next(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<St::Item>> {
		let mut this = self.project();

		Poll::Ready(loop {
			let next = ready!(this.stream.as_mut().poll_next(cx));
			match next.map(|item| item.filter(this.filters)).unwrap_or_default() {
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
