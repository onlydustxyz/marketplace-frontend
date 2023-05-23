/// This crate provides several macros to simplify the implementation of Diesel repositories:
/// - [DieselMappingRepository](./macro.DieselMappingRepository.html): Implements a mapping repository between two entities using Diesel.
/// - [DieselRepository](./macro.DieselRepository.html): Implements a repository for a single entity using Diesel.
/// - [FromToSql](./macro.FromToSql.html): Implements the traits [ToSql](https://docs.rs/diesel/2.0.2/diesel/serialize/trait.ToSql.html) and [FromSql](https://docs.rs/diesel/2.0.2/diesel/deserialize/trait.FromSql.html), required for Diesel queries.
///
/// # Examples
///
/// Implement a [DieselRepository](./macro.DieselRepository.html) for a single entity using Diesel:
///
/// ```rust
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(User)]
/// #[table(dsl::user)]
/// #[id(dsl::user_id)]
/// pub struct UserRepository(Arc<Client>);
/// ```
///
/// Implement a mocked version of the repository:
///
/// ```rust
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(User)]
/// #[table(dsl::user)]
/// #[id(dsl::user_id)]
/// #[mock]
/// pub struct UserRepositoryMock(Arc<Client>);
/// ```
///
/// Implement a [DieselMappingRepository](./macro.DieselMappingRepository.html) between two entities using Diesel:
///
/// ```rust
/// #[derive(DieselMappingRepository, Constructor, Clone)]
/// #[entities((Project, GithubRepo))]
/// #[ids((dsl::project_id, dsl::github_repo_id))]
/// #[table(dsl::project_github_repos)]
/// pub struct Repository(Arc<Client>);
/// ```
///
/// Implement a mocked version of the repository:
///
/// ```rust
/// #[derive(DieselMappingRepository, Constructor, Clone)]
/// #[entities((Project, GithubRepo))]
/// #[ids((dsl::project_id, dsl::github_repo_id))]
/// #[table(dsl::project_github_repos)]
/// #[mock]
/// pub struct RepositoryMock(Arc<Client>);
/// ```
///
/// Implement the [FromToSql](./macro.FromToSql.html) trait:
///
/// ```rust
/// #[derive(AsExpression, FromToSql, FromSqlRow)]
/// #[sql_type = "diesel::sql_types::Uuid"]
/// struct Id(u32);
/// ```
extern crate proc_macro;
extern crate convert_case;
extern crate syn;

use convert_case::{Case, Casing};
use proc_macro::TokenStream;
use syn::{parse::Parse, DeriveInput, Ident};

mod diesel_mapping_repository;
mod diesel_repository;
mod from_to_sql;

/// Implements a mapping repository between two entities using Diesel.
///
/// # Usage
///
/// ```rust
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
/// ```rust
/// #[derive(DieselMappingRepository, Constructor, Clone)]
/// #[entities((Project, GithubRepo))]
/// #[ids((dsl::project_id, dsl::github_repo_id))]
/// #[table(dsl::project_github_repos)]
/// #[mock]
/// pub struct RepositoryMock(Arc<Client>);
/// ```
#[proc_macro_derive(DieselMappingRepository, attributes(table, entities, ids, mock))]
pub fn diesel_mapping_repository(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	diesel_mapping_repository::impl_diesel_mapping_repository(derive_input)
}

/// Implements a repository for a single entity using Diesel.
///
/// # Usage
///
/// ```rust
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(User)]
/// #[table(dsl::user)]
/// #[id(dsl::user_id)]
/// pub struct UserRepository(Arc<Client>);
/// ```
///
/// You can also choose which parts of the repository to implement thanks to the `#[features]`
/// attribute:
///
/// ```rust
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(User)]
/// #[table(dsl::user)]
/// #[id(dsl::user_id)]
/// #[features(select, insert, update, delete)]
/// pub struct UserRepository(Arc<Client>);
/// ```
///
/// When the `mock` attribute is present, a mocked implementation of the repository
/// (using mockall crate) will be generated as well.
///
/// ```rust
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(User)]
/// #[table(dsl::user)]
/// #[id(dsl::user_id)]
/// #[mock]
/// pub struct UserRepositoryMock(Arc<Client>);
/// ```
#[proc_macro_derive(DieselRepository, attributes(entity, table, id, features, mock))]
pub fn diesel_repository(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	diesel_repository::impl_diesel_repository(derive_input)
}

/// Implement the trait [FromSql](https://docs.rs/diesel/2.0.2/diesel/deserialize/trait.FromSql.html)
/// and the trait [ToSql](https://docs.rs/diesel/2.0.2/diesel/serialize/trait.ToSql.html) required for Diesel queries.
///
/// # Usage
///
/// ```rust
/// #[derive(AsExpression, FromToSql, FromSqlRow)]
/// #[sql_type = "diesel::sql_types::Uuid"]
/// struct Id(u32);
/// ```
///
/// Single field unnamed structs will be modelized as their inner type (newtype patter).
/// Enums and named structs will be modelized as [serde_json::Value](https://docs.rs/serde_json/1.0.89/serde_json/enum.Value.html).
///
/// You may also need to derive [FromSqlRow](https://docs.rs/diesel/2.0.2/diesel/deserialize/trait.FromSqlRow.html) and [AsExpression](https://docs.rs/diesel/2.0.2/diesel/expression/trait.AsExpression.html) in order to use the macro in actual diesel
/// queries.
#[proc_macro_derive(FromToSql, attributes(sql_type))]
pub fn to_sql(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	from_to_sql::impl_from_to_sql_macro(derive_input)
}

/// Convert an ident to snake case.
///
/// # Usage
///
/// ```rust
/// let snake_case = ident_to_snake_case(&ident);
/// ```
fn ident_to_snake_case(ident: &Ident) -> String {
	ident.to_string().from_case(Case::UpperCamel).to_case(Case::Snake)
}

/// Find the attribute value in a given AST object.
///
/// # Usage
///
/// ```rust
/// let value = find_attr::<String>(&ast, "my_attribute");
/// ```
fn find_attr<T: Parse>(ast: &DeriveInput, attr_name: &str) -> T {
	let attr = ast
		.attrs
		.iter()
		.find(|a| a.path.is_ident(attr_name))
		.unwrap_or_else(|| panic!("{} keyword not found", attr_name));

	attr
		.parse_args()
		.unwrap_or_else(|e| panic!("Failed to parse attribute {}: {}", attr_name, e))
}

/// Check if a attribute is present in a given AST object.
///
/// # Usage
///
/// ```rust
/// let has_mock_attribute = has_attr(&ast, "mock");
/// ```
fn has_attr(derive_input: &syn::DeriveInput, attr_name: &str) -> bool {
	derive_input.attrs.iter().any(|a| a.path.is_ident(attr_name))
}