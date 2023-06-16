use proc_macro::TokenStream;
use quote::quote;

pub fn impl_derive(derive_input: syn::DeriveInput) -> TokenStream {
	let name = &derive_input.ident;

	let expanded = quote!(
		impl ::infrastructure::database::ImmutableModel<::diesel::pg::PgConnection> for #name
		{
			fn exists(
				connection: &mut ::diesel::pg::PgConnection,
				id: <Self as ::diesel::associations::Identifiable>::Id,
			) -> ::infrastructure::database::Result<bool> {
				use ::diesel::{associations::HasTable, QueryDsl, RunQueryDsl};
				::diesel::select(::diesel::dsl::exists(<Self as HasTable>::table().find(id)))
					.get_result(connection)
					.map_err(|e| e.into())
			}

			fn find_by_id(
				connection: &mut ::diesel::pg::PgConnection,
				id: <Self as ::diesel::associations::Identifiable>::Id,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, QueryDsl, RunQueryDsl};
				<Self as HasTable>::table().find(id).first(&mut *connection).map_err(Into::into)
			}

			fn list(
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Vec<Self>> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				<Self as HasTable>::table().load(connection).map_err(Into::into)
			}

			fn insert(
				self,
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				::diesel::insert_into(<Self as HasTable>::table())
					.values(self)
					.get_result(connection)
					.map_err(Into::into)
			}

			fn try_insert(
				self,
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Option<Self>> {
				use ::diesel::{associations::HasTable, OptionalExtension, RunQueryDsl};
				::diesel::insert_into(<Self as HasTable>::table())
					.values(self)
					.on_conflict_do_nothing()
					.get_result(connection)
					.optional()
					.map_err(Into::into)
			}

			fn delete(
				connection: &mut ::diesel::pg::PgConnection,
				id: <Self as ::diesel::associations::Identifiable>::Id,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, EqAll, RunQueryDsl, Table};
				diesel::delete(<Self as HasTable>::table())
					.filter(<Self as HasTable>::table().primary_key().eq_all(id))
					.get_result(connection)
					.map_err(Into::into)
			}

			fn clear(
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<()> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				diesel::delete(<Self as HasTable>::table())
					.returning(<Self as HasTable>::table().star())
					.execute(connection)?;
				Ok(())
			}
		}
	);

	TokenStream::from(expanded)
}
