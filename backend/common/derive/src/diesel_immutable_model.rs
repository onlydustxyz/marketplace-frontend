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
				use infrastructure::contextualized_error::IntoContextualizedError;
				::diesel::select(::diesel::dsl::exists(<Self as HasTable>::table().find(id.clone())))
					.get_result(connection)
					.err_with_context(format!("exists {} where id={id:?}", stringify!(#name)))
					.map_err(|e| e.into())
			}

			fn find_by_id(
				connection: &mut ::diesel::pg::PgConnection,
				id: <Self as ::diesel::associations::Identifiable>::Id,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, QueryDsl, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				<Self as HasTable>::table().find(id.clone()).first(&mut *connection)
					.err_with_context(format!("find {} where id={id:?}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn list(
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Vec<Self>> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				<Self as HasTable>::table().load(connection)
					.err_with_context(format!("list {}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn insert(
				self,
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Self> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				::diesel::insert_into(<Self as HasTable>::table())
					.values(self)
					.get_result(connection)
					.err_with_context(format!("insert {}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn insert_all(
				connection: &mut ::diesel::pg::PgConnection,
				values: Vec<Self>,
			) -> ::infrastructure::database::Result<usize> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				::diesel::insert_into(<Self as HasTable>::table())
					.values(values)
					.execute(connection)
					.err_with_context(format!("insert_all {}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn try_insert(
				self,
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<Option<Self>> {
				use ::diesel::{associations::HasTable, OptionalExtension, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				::diesel::insert_into(<Self as HasTable>::table())
					.values(self)
					.on_conflict_do_nothing()
					.get_result(connection)
					.optional()
					.err_with_context(format!("try_insert {}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn delete(
				connection: &mut ::diesel::pg::PgConnection,
				id: <Self as ::diesel::associations::Identifiable>::Id,
			) -> ::infrastructure::database::Result<Option<Self>> {
				use ::diesel::{associations::HasTable, OptionalExtension, EqAll, RunQueryDsl, Table};
				use infrastructure::contextualized_error::IntoContextualizedError;
				diesel::delete(<Self as HasTable>::table())
					.filter(<Self as HasTable>::table().primary_key().eq_all(id.clone()))
					.get_result(connection)
					.optional()
					.err_with_context(format!("delete {} where id={id:?}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn delete_all<P>(
				connection: &mut ::diesel::pg::PgConnection,
				predicate: P,
			) -> ::infrastructure::database::Result<usize>
			where
				::diesel::query_builder::DeleteStatement<Self::Table, Self::WhereClause>:
					::diesel::query_dsl::methods::FilterDsl<P>,
				<P as ::diesel::Expression>::SqlType: ::diesel::sql_types::BoolOrNullableBool,
				P: ::diesel::AppearsOnTable<Self::Table> + ::diesel::query_builder::QueryFragment<::diesel::pg::Pg> + ::diesel::query_builder::QueryId,
			{
				use ::diesel::{associations::HasTable, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				diesel::delete(<Self as HasTable>::table())
					.filter(predicate)
					.execute(connection)
					.err_with_context(format!("delete_all {}", stringify!(#name)))
					.map_err(Into::into)
			}

			fn clear(
				connection: &mut ::diesel::pg::PgConnection,
			) -> ::infrastructure::database::Result<()> {
				use ::diesel::{associations::HasTable, RunQueryDsl};
				use infrastructure::contextualized_error::IntoContextualizedError;
				diesel::delete(<Self as HasTable>::table())
					.returning(<Self as HasTable>::table().star())
					.execute(connection)
					.err_with_context(format!("clear {}", stringify!(#name)))?;
				Ok(())
			}
		}
	);

	TokenStream::from(expanded)
}
