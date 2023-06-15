extern crate proc_macro;

use convert_case::{Case, Casing};
use proc_macro::TokenStream;
use syn::{parse::Parse, DeriveInput, Ident};

mod diesel_mapping_repository;
mod diesel_repository;

/// Implements a mapping repository between two entities using Diesel.
///
/// ```compile_fail
/// #[derive(DieselMappingRepository, Constructor, Clone)]
/// #[entities((Project, GithubRepo))]
/// #[ids((dsl::project_id, dsl::github_repo_id))]
/// #[table(dsl::project_github_repos)]
/// pub struct Repository(Arc<Client>);
/// ```
///
/// When the `mock` attribute is present, a mocked implementation of the repository
/// (using mockall crate) will be generated as well.
///
/// ```compile_fail
/// #[derive(DieselMappingRepository, Constructor, Clone)]
/// #[entities((Project, GithubRepo))]
/// #[ids((dsl::project_id, dsl::github_repo_id))]
/// #[table(dsl::project_github_repos)]
/// #[mock]
/// pub struct Repository(Arc<Client>);
/// ```
#[proc_macro_derive(DieselMappingRepository, attributes(table, entities, ids, mock))]
pub fn diesel_mapping_repository(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	diesel_mapping_repository::impl_diesel_mapping_repository(derive_input)
}

/// Implements a repository for this entity using Diesel.
///
/// ```compile_fail
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(ProjectDetails)]
/// #[table(dsl::project_details)]
/// #[id(dsl::project_id)]
/// pub struct Repository(Arc<Client>);
/// ```
///
/// You can also choose which part of the repository to implement thanks to the #[features]
/// attribute:
///
/// ```compile_fail
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(ProjectDetails)]
/// #[table(dsl::project_details)]
/// #[id(dsl::project_id)]
/// #[features(select, insert, update, delete)]
/// pub struct Repository(Arc<Client>);
/// ```
///
/// When the `mock` attribute is present, a mocked implementation of the repository
/// (using mockall crate) will be generated as well.
///
/// ```compile_fail
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(ProjectDetails)]
/// #[table(dsl::project_details)]
/// #[id(dsl::project_id)]
/// #[mock]
/// pub struct Repository(Arc<Client>);
/// ```
#[proc_macro_derive(DieselRepository, attributes(entity, table, id, features, mock))]
pub fn diesel_repository(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	diesel_repository::impl_diesel_repository(derive_input)
}

fn find_attr<T: Parse>(ast: &DeriveInput, attr_name: &str) -> T {
	ast.attrs
		.iter()
		.find(|a| a.path.is_ident(attr_name))
		.unwrap_or_else(|| panic!("{attr_name} keyword not found"))
		.parse_args()
		.unwrap_or_else(|e| panic!("Failed to parse attribute {attr_name}: {e}"))
}

fn has_attr(derive_input: &syn::DeriveInput, attr_name: &str) -> bool {
	derive_input.attrs.iter().any(|a| a.path.is_ident(attr_name))
}

fn ident_to_snake_case(ident: &Ident) -> String {
	ident.to_string().from_case(Case::UpperCamel).to_case(Case::Snake)
}
