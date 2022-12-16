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

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		use diesel::RunQueryDsl;
		use diesel::ExpressionMethods;
		use diesel::query_dsl::filter_dsl::FindDsl;

		impl infrastructure::database::MappingRepository<#entity1, #entity2> for #repository_name {
			fn insert(&self, id1: &<#entity1 as domain::Entity>::Id, id2: &<#entity2 as domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;

				diesel::insert_into(#table)
					.values((#id1.eq(id1), #id2.eq(id2)))
					.execute(&*connection)?;

				Ok(())
			}
		}
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}
