use proc_macro::TokenStream;
use quote::quote;
use syn::TypePath;

use super::find_attr;

pub fn impl_diesel_repository(derive_input: syn::DeriveInput) -> TokenStream {
	// Parse the input into an ast
	let repository_name = derive_input.ident.clone();
	let entity_type: TypePath = find_attr(&derive_input, "entity");
	let table: TypePath = find_attr(&derive_input, "table");
	let id: TypePath = find_attr(&derive_input, "id");

	let table_ident = &table.path.segments.last().unwrap().ident;
	let find_by_id_span_name = format!("{}::find_by_id", table_ident);
	let insert_span_name = format!("{}::insert", table_ident);
	let update_span_name = format!("{}::update", table_ident);
	let upsert_span_name = format!("{}::upsert", table_ident);
	let delete_span_name = format!("{}::delete", table_ident);
	let clear_span_name = format!("{}::clear", table_ident);

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		use diesel::RunQueryDsl;
		use diesel::ExpressionMethods;
		use diesel::query_dsl::filter_dsl::FindDsl;
		use diesel::query_builder::{AsChangeset, QueryFragment};
		use diesel::pg::Pg;

		impl #repository_name {
			#[tracing::instrument(name = #find_by_id_span_name, skip(self))]
			pub fn find_by_id(&self, id: <&#entity_type as ::domain::Entity>::Id) -> Result<#entity_type, infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				let entity = #table.find(*id).first(&*connection)?;
				Ok(entity)
			}

			#[tracing::instrument(name = #insert_span_name, skip(self))]
			pub fn insert(&self, entity: &#entity_type) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table).values(entity).execute(&*connection)?;
				Ok(())
			}

			#[tracing::instrument(name = #update_span_name, skip(self, change_set))]
			pub fn update<A: AsChangeset<Target = #table, Changeset = C>, C: QueryFragment<Pg>>(&self, id: <&#entity_type as ::domain::Entity>::Id, change_set: A) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::update(#table)
					.filter(#id.eq(id))
					.set(change_set)
					.execute(&*connection)?;
				Ok(())
			}

			#[tracing::instrument(name = #upsert_span_name, skip(self))]
			pub fn upsert(&self, entity: &#entity_type)  -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table)
					.values(entity)
					.on_conflict(#id)
					.do_update()
					.set(entity)
					.execute(&*connection)?;
				Ok(())
			}

			#[tracing::instrument(name = #delete_span_name, skip(self))]
			pub fn delete(&self, id: <&#entity_type as ::domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::delete(#table).filter(#id.eq(id)).execute(&*connection)?;
				Ok(())
			}

			#[tracing::instrument(name = #clear_span_name, skip(self))]
			pub fn clear(&self) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::delete(#table).execute(&*connection)?;
				Ok(())
			}
		}
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}
