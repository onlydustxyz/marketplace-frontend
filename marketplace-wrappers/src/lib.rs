use proc_macro::TokenStream;

mod uuid_wrapper;

#[proc_macro_derive(UuidWrapper)]
pub fn uuid_wrapper_macro_derive(input: TokenStream) -> TokenStream {
	let ast = syn::parse(input).unwrap();

	uuid_wrapper::impl_uuid_wrapper_macro(&ast)
}
