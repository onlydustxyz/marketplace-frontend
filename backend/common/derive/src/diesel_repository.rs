use proc_macro::TokenStream;
use quote::quote;
use syn::{punctuated::Punctuated, Ident, NestedMeta, Token, TypePath};

use super::find_attr;
use crate::has_attr;

pub fn impl_diesel_repository(derive_input: syn::DeriveInput) -> TokenStream {
	// Parse the input into an ast
	let repository_name = derive_input.ident.clone();
	let entity_type: TypePath = find_attr(&derive_input, "entity");
	let table: TypePath = find_attr(&derive_input, "table");
	let id: TypePath = find_attr(&derive_input, "id");
	let features = parse_features_attribute(&derive_input);

	let table_ident = &table.path.segments.last().unwrap().ident;
	let find_by_id_span_name = format!("{}::find_by_id", table_ident);
	let insert_span_name = format!("{}::insert", table_ident);
	let update_span_name = format!("{}::update", table_ident);
	let upsert_span_name = format!("{}::upsert", table_ident);
	let delete_span_name = format!("{}::delete", table_ident);
	let clear_span_name = format!("{}::clear", table_ident);

	let select_methods = if has_feature(&features, "select") {
		quote! {
			#[tracing::instrument(name = #find_by_id_span_name, skip(self))]
			pub fn find_by_id(&self, id: <&#entity_type as ::domain::Entity>::Id) -> Result<#entity_type, infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				let entity = #table.find(*id).first(&*connection)?;
				Ok(entity)
			}
		}
	} else {
		quote! {}
	};

	let insert_methods = if has_feature(&features, "insert") {
		quote! {
			#[tracing::instrument(name = #insert_span_name, skip(self))]
			pub fn insert(&self, entity: &#entity_type) -> Result<(), infrastructure::database::DatabaseError> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table).values(entity).execute(&*connection)?;
				Ok(())
			}

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
			#[tracing::instrument(name = #update_span_name, skip(self, change_set))]
			pub fn update<A: AsChangeset<Target = #table, Changeset = C>, C: QueryFragment<Pg>>(&self, id: <&#entity_type as ::domain::Entity>::Id, change_set: A) -> Result<(), infrastructure::database::DatabaseError> {
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
		use diesel::query_dsl::filter_dsl::FindDsl;
		use diesel::query_builder::{AsChangeset, QueryFragment};
		use diesel::pg::Pg;

		impl #repository_name {
			#select_methods
			#insert_methods
			#update_methods
			#upsert_methods
			#delete_methods
		}

		#mocks
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}

fn impl_mocks(
	repository_name: &Ident,
	entity_type: &TypePath,
	table: &TypePath,
	features: &Option<Vec<String>>,
) -> quote::__private::TokenStream {
	let select_methods = if has_feature(features, "select") {
		quote! {
			pub fn find_by_id(&self, id: &<#entity_type as ::domain::Entity>::Id) -> Result<#entity_type, infrastructure::database::DatabaseError>;
		}
	} else {
		quote! {}
	};

	let insert_methods = if has_feature(features, "insert") {
		quote! {
			pub fn insert(&self, entity: &#entity_type) -> Result<(), infrastructure::database::DatabaseError>;
			pub fn try_insert(&self, entity: &#entity_type) -> Result<(), infrastructure::database::DatabaseError>;
		}
	} else {
		quote! {}
	};

	let update_methods = if has_feature(features, "update") {
		quote! {
			pub fn update<
					A: AsChangeset<Target = #table, Changeset = C> + 'static,
					C: QueryFragment<Pg> + 'static
				>(&self, id: &<#entity_type as ::domain::Entity>::Id, change_set: A) -> Result<(), infrastructure::database::DatabaseError>;
		}
	} else {
		quote! {}
	};
	let upsert_methods = if has_feature(features, "insert") && has_feature(features, "update") {
		quote! {
			pub fn upsert(&self, entity: &#entity_type)  -> Result<(), infrastructure::database::DatabaseError>;
		}
	} else {
		quote! {}
	};

	let delete_methods = if has_feature(features, "delete") {
		quote! {
			pub fn delete(&self, id: &<#entity_type as ::domain::Entity>::Id) -> Result<(), infrastructure::database::DatabaseError>;
			pub fn clear(&self) -> Result<(), infrastructure::database::DatabaseError>;
		}
	} else {
		quote! {}
	};

	// Build the output
	let expanded = quote! {
		#[cfg(test)]
		mockall::mock! {
			pub #repository_name {
				pub fn new(client: std::sync::Arc<infrastructure::database::Client>) -> Self;
				#select_methods
				#insert_methods
				#update_methods
				#upsert_methods
				#delete_methods
			}

			impl Clone for #repository_name {
				fn clone(&self) -> Self;
			}
		}
	};

	expanded
}

fn has_feature(features: &Option<Vec<String>>, feature: &str) -> bool {
	features.is_none() || features.as_ref().unwrap().contains(&feature.to_string())
}

fn parse_features_attribute(derive_input: &syn::DeriveInput) -> Option<Vec<String>> {
	derive_input
		.attrs
		.iter()
		.find(|a| a.path.is_ident("features"))
		.map(|features_attr| {
			features_attr
				.parse_args_with(Punctuated::<NestedMeta, Token![,]>::parse_terminated)
				.unwrap()
				.iter()
				.map(|nested| match nested {
					NestedMeta::Meta(meta) => match meta {
						syn::Meta::Path(path) => {
							let feature = path
								.get_ident()
								.expect("expected a meta path ident")
								.to_owned()
								.to_string();
							assert!(
								vec!["select", "insert", "update", "delete"]
									.contains(&feature.as_str()),
								"features can only contain select, insert, update or delete"
							);
							feature
						},
						_ => panic!("expected a meta path"),
					},
					_ => panic!("expected a meta argument"),
				})
				.collect::<Vec<_>>()
		})
}
