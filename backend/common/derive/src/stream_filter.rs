use proc_macro::TokenStream;
use quote::quote;

use crate::ident_to_snake_case;

pub fn impl_stream_filter(derive_input: syn::DeriveInput) -> TokenStream {
	// Parse the input into an ast
	let type_name = derive_input.ident;

	let mod_name = syn::Ident::new(
		&format!("{}_stream_filter", ident_to_snake_case(&type_name)),
		type_name.span(),
	);

	let filter_method_name = syn::Ident::new(
		&format!("filter_{}s_with", ident_to_snake_case(&type_name)),
		type_name.span(),
	);

	// Build the output
	let expanded = quote! {
		pub mod #mod_name {
			use super::#type_name;

			pub trait StreamFilterWith: futures::Stream
			where
				Self: Sized,
			{
				fn #filter_method_name(self, filters: std::sync::Arc<dyn Filter>) -> FilterWith<Self> {
					FilterWith::new(self, filters)
				}
			}

			impl<S: futures::Stream> StreamFilterWith for S {}

			pin_project_lite::pin_project! {
				#[derive(derive_more::Constructor)]
				#[must_use = "streams do nothing unless polled"]
				pub struct FilterWith<St: futures::Stream>
				{
					#[pin]
					stream: St,
					filters: std::sync::Arc<dyn Filter>,
				}
			}

			pub trait Filter: Send + Sync {
				fn filter(
					&self,
					item: #type_name,
				) -> Decision;
			}

			#[derive(Default, Debug, PartialEq, Eq)]
			pub enum Decision {
				Take(#type_name), // Item is valid, take it
				Skip,    // Item is not valid, keep looking
				#[default]
				End, // Item is not valid, neither are the rest. End of the stream.
			}

			impl<St: futures::Stream<Item = #type_name>> futures::Stream for FilterWith<St> {
				type Item = #type_name;

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
		}
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}
