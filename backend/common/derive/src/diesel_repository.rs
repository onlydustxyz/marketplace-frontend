/// This module implements a procedural macro for generating repository implementations for Diesel ORM.
///
/// A repository is a database access object that provides an abstraction over the details of the underlying database.
/// It acts as a mediator between the domain objects and the database objects and provides an interface for performing CRUD operations on the domain objects.
///
/// The macro can derive the implementation of the following traits:
/// * `Clone`: Allows cloning the repository object.
///
/// # Example
///
/// ```
/// use diesel_repository_macros::diesel_repository;
/// use my_domain_model::MyEntity;
///
/// #[diesel_repository(table = "my_entities", entity = "MyEntity", id = "i32", features(select, insert, update, delete))]
/// pub struct MyEntityRepository(diesel::r2d2::Pool<diesel::r2d2::ConnectionManager<diesel::pg::PgConnection>>);
/// ```
pub use proc_macro::TokenStream;

use proc_macro2::TokenStream as TokenStream2;
use quote::quote;
use syn::{punctuated::Punctuated, Ident, NestedMeta, Token, TypePath};

use super::find_attr;
use crate::has_attr;

/// Implements the `diesel_repository` procedural macro for a given input type.
/// The generated code provides an abstraction layer over the details of the underlying database for CRUD operations on the domain objects.
///
/// # Arguments
///
/// * `derive_input`: A `syn::DeriveInput` struct representing the input of the macro.
///
/// # Example
///
/// ```
/// #[diesel_repository(table = "my_entities", entity = "MyEntity", id = "i32", features(select, insert))]
/// pub struct MyEntityRepository(diesel::r2d2::Pool<diesel::r2d2::ConnectionManager<diesel::pg::PgConnection>>);
/// ```
///
pub fn impl_diesel_repository(derive_input: syn::DeriveInput) -> TokenStream {
	// Parse the input into an ast
	let repository_name = derive_input.ident.clone();
	let entity_type: TypePath = find_attr(&derive_input, "entity");
	let table: TypePath = find_attr(&derive_input, "table");
	let id: TypePath = find_attr(&derive_input, "id");
	let features = parse_features_attribute(&derive_input);

	let table_ident = &table.path.segments.last().unwrap().ident;
	let find_by_id_span_name = format!("{}::find_by_id", table_ident);
	let exists_span_name = format!("{}::count", table_ident);
	let insert_span_name = format!("{}::insert", table_ident);
	let update_span_name = format!("{}::update", table_ident);
	let upsert_span_name = format!("{}::upsert", table_ident);
	let delete_span_name = format!("{}::delete", table_ident);
	let clear_span_name = format!("{}::clear", table_ident);
	let list_span_name = format!("{}::list", table_ident);

	let select_methods = if has_feature(&features, "select") {
		quote! {
			/// Returns whether an entity with the given id exists in the table.
			#[tracing::instrument(name = #exists_span_name, skip(self))]
			pub fn exists(&self, id: &<#entity_type as ::domain::Entity>::Id) -> Result<bool, infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				let exists = diesel::select(diesel::dsl::exists(#table.filter(#id.eq(id)))).get_result(&*connection)?;
				Ok(exists)
			}

			/// Returns the entity with the given id from the table.
			#[tracing::instrument(name = #find_by_id_span_name, skip(self))]
			pub fn find_by_id(&self, id: &<#entity_type as ::domain::Entity>::Id) -> Result<#entity_type, infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				let entity = #table.find(*id).first(&*connection)?;
				Ok(entity)
			}

			/// Returns all entities from the table.
			#[tracing::instrument(name = #list_span_name, skip(self))]
			pub fn list(&self) -> Result<Vec<#entity_type>, infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				let entities = #table.get_results(&*connection)?;
				Ok(entities)
			}
		}
	} else {
		quote! {}
	};

	let insert_methods = if has_feature(&features, "insert") {
		quote! {
			/// Inserts the given entity into the table.
			#[tracing::instrument(name = #insert_span_name, skip(self))]
			pub fn insert(&self, entity: &#entity_type) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table).values(entity).execute(&*connection)?;
				Ok(())
			}

			/// Attempts to insert the given entity into the table, but does nothing if it already exists.
			#[tracing::instrument(name = #insert_span_name, skip(self))]
			pub fn try_insert(&self, entity: &#entity_type) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table)
					.values(entity)
					.on_conflict_do_nothing()
					.execute(&*connection)?;
				Ok(())
			}
		}
	} else {
		quote! {}
	};

	let update_methods = if has_feature(&features, "update") {
		quote! {
			/// Updates the entity with the given id in the table, according to the given change set.
			#[tracing::instrument(name = #update_span_name, skip(self, change_set))]
			pub fn update<A: AsChangeset<Target = #table, Changeset = C>, C: QueryFragment<Pg>>(&self, id: &<#entity_type as ::domain::Entity>::Id, change_set: A) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::update(#table)
					.filter(#id.eq(id))
					.set(change_set)
					.execute(&*connection)?;
				Ok(())
			}
		}
	} else {
		quote! {}
	};
	let upsert_methods = if has_feature(&features, "insert") && has_feature(&features, "update") {
		quote! {
			/// Upserts (inserts or updates) the given entity into the table.
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
		}
	} else {
		quote! {}
	};

	let delete_methods = if has_feature(&features, "delete") {
		quote! {
			/// Deletes the entity with the given id from the table.
			#[tracing::instrument(name = #delete_span_name, skip(self))]
			pub fn delete(&self, id: &<#entity_type as ::domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::delete(#table).filter(#id.eq(id)).execute(&*connection)?;
				Ok(())
			}

			/// Deletes all entities from the table.
			#[tracing::instrument(name = #clear_span_name, skip(self))]
			pub fn clear(&self) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::delete(#table).execute(&*connection)?;
				Ok(())
			}
		}
	} else {
		quote! {}
	};

	let mocks = if has_attr(&derive_input, "mock") {
		impl_mocks(&repository_name, &entity_type, &table, &features)
	} else {
		quote! {}
	};

	// Build the output
	let expanded = quote! {
		use diesel::RunQueryDsl;
		use diesel::ExpressionMethods;
	