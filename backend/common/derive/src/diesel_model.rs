use proc_macro::TokenStream;
use quote::quote;

pub fn impl_derive(derive_input: syn::DeriveInput) -> TokenStream {
	let name = &derive_input.ident;

	let expanded = quote!(
		impl ::infrastructure::database::Model<::diesel::pg::PgConnection> for #name
		{
			fn update(
				self,
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, RunQueryDsl, Table};
				use infrastructure::contextualized_error::IntoContextualizedError;
				diesel::update(&self).set(&self).get_result(connection)
					.err_with_context(format!("update {} where id={:?}", stringify!(#name), <Self as HasTable>::table().primary_key()))
					.map_err(Into::into)
			}

			fn upsert(
				self,
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, RunQueryDsl, Table};
				use infrastructure::contextualized_error::IntoContextualizedError;
				diesel::insert_into(<Self as HasTable>::table())
					.values(&self)
					.on_conflict(<Self as HasTable>::table().primary_key())
					.do_update()
					.set(&self)
					.get_result(connection)
					.err_with_context(format!("upsert {} where id={:?}", stringify!(#name), <Self as HasTable>::table().primary_key()))
					.map_err(Into::into)
			}
		}
	);

	TokenStream::from(expanded)
}
