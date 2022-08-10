use proc_macro::TokenStream;
use quote::quote;
use syn;

pub fn impl_uuid_wrapper_macro(ast: &syn::DeriveInput) -> TokenStream {
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
