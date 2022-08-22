use proc_macro::TokenStream;

mod uuid_wrapper;

#[proc_macro_derive(UuidWrapper)]
pub fn uuid_wrapper_macro_derive(input: TokenStream) -> TokenStream {
	let ast = syn::parse(input).unwrap();

	uuid_wrapper::impl_uuid_wrapper_macro(&ast)
}

mod hex_string_wrapper;

#[proc_macro_derive(HexStringWrapper)]
pub fn hex_string_wrapper_macro_derive(input: TokenStream) -> TokenStream {
	let ast = syn::parse(input).unwrap();

	hex_string_wrapper::impl_hex_string_wrapper_macro(&ast)
}
