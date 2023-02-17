use proc_macro::TokenStream;
use quote::quote;
use syn::{Type, TypePath, TypeTuple};

use super::find_attr;

trait UnwrapAsPath {
	fn unwrap_as_path(&self) -> TypePath;
}

impl UnwrapAsPath for Type {
	fn unwrap_as_path(&self) -> TypePath {
		match self {
			Type::Path(path) => path.clone(),
			_ => panic!("TypePath required"),
		}
	}
}

fn find_entities(input: &syn::DeriveInput) -> (TypePath, TypePath) {
	let entities: TypeTuple = find_attr(input, "entities");
	assert_eq!(
		entities.elems.len(),
		2,
		"DieselMappingRepository only support mapping with 2 entities"
	);
	let entity1 = entities.elems.first().unwrap().unwrap_as_path();
	let entity2 = entities.elems.last().unwrap().unwrap_as_path();
	(entity1, entity2)
}

fn find_ids(input: &syn::DeriveInput) -> (TypePath, TypePath) {
	let ids: TypeTuple = find_attr(input, "ids");
	assert_eq!(
		ids.elems.len(),
		2,
		"DieselMappingRepository only support mapping with 2 entities"
	);
	let id1 = ids.elems.first().unwrap().unwrap_as_path();
	let id2 = ids.elems.last().unwrap().unwrap_as_path();
	(id1, id2)
}

pub fn impl_diesel_mapping_repository(input: syn::DeriveInput) -> TokenStream {
	let repository_name = input.ident.clone();
	let table: TypePath = find_attr(&input, "table");
	let (entity1, entity2) = find_entities(&input);
	let (id1, id2) = find_ids(&input);

	let table_ident = &table.path.segments.last().unwrap().ident;
	let insert_span_name = format!("{}::insert", table_ident);
	let delete_span_name = format!("{}::delete", table_ident);

	let entity1_ident = entity1.path.get_ident().unwrap();
	let entity2_ident = entity2.path.get_ident().unwrap();

	let delete_all_entity1_of = syn::Ident::new(
		&format!("delete_all_{entity1_ident}s_of"),
		entity1_ident.span(),
	);
	let delete_all_entity2_of = syn::Ident::new(
		&format!("delete_all_{entity2_ident}s_of"),
		entity2_ident.span(),
	);

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		use diesel::RunQueryDsl;
		use diesel::QueryDsl;
		use diesel::ExpressionMethods;
		use diesel::query_dsl::filter_dsl::FindDsl;

		impl #repository_name {
			#[tracing::instrument(name = #insert_span_name, skip(self))]
			pub fn try_insert(&self, id1: &<#entity1 as domain::Entity>::Id, id2: &<#entity2 as domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;

				diesel::insert_into(#table)
					.values((#id1.eq(id1), #id2.eq(id2)))
					.on_conflict_do_nothing()
					.execute(&*connection)?;

				Ok(())
			}

			#[tracing::instrument(name = #delete_span_name, skip(self))]
			pub fn delete(&self, id1: &<#entity1 as domain::Entity>::Id, id2: &<#entity2 as domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;

				diesel::delete(#table.filter(#id1.eq(id1)).filter(#id2.eq(id2)))
					.execute(&*connection)?;

				Ok(())
			}

			#[tracing::instrument(name = #delete_span_name, skip(self))]
			#[allow(non_snake_case)]
			pub fn #delete_all_entity2_of(&self, id1: &<#entity1 as domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;

				diesel::delete(#table.filter(#id1.eq(id1)))
					.execute(&*connection)?;

				Ok(())
			}

			#[tracing::instrument(name = #delete_span_name, skip(self))]
			#[allow(non_snake_case)]
			pub fn #delete_all_entity1_of(&self, id2: &<#entity2 as domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;

				diesel::delete(#table.filter(#id2.eq(id2)))
					.execute(&*connection)?;

				Ok(())
			}
		}
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}
