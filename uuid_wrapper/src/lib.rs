use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(UuidWrapper)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
	// Construct a representation of Rust code as a syntax tree
	// that we can manipulate
	let ast = syn::parse(input).unwrap();

	// Build the trait implementation
	impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
	let name = &ast.ident;
	let gen = quote! {
		impl #name {
			pub fn as_uuid(&self) -> &uuid::Uuid {
				&self.0
			}
		}

		impl From<uuid::Uuid> for #name {
			fn from(uuid: uuid::Uuid) -> Self {
				Self(uuid)
			}
		}

		impl From<#name> for uuid::Uuid {
			fn from(id: #name) -> Self {
				id.0
			}
		}

		impl std::fmt::Display for #name {
			fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
				std::fmt::Display::fmt(&self.0, f)
			}
		}
	};
	gen.into()
}
