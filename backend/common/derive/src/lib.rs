extern crate proc_macro;

use proc_macro::TokenStream;
use syn::{parse::Parse, DeriveInput};

mod diesel_mapping_repository;
mod diesel_repository;
mod from_to_sql;

/// Implements a mapping repository between two entities using Diesel.
#[proc_macro_derive(DieselMappingRepository, attributes(table, entities, ids))]
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
/// attribute: ```compile_fail
/// #[derive(DieselRepository, Constructor, Clone)]
/// #[entity(ProjectDetails)]
/// #[table(dsl::project_details)]
/// #[id(dsl::project_id)]
/// #[features(select, insert, update, delete)]
/// pub struct Repository(Arc<Client>);
/// ```
#[proc_macro_derive(DieselRepository, attributes(entity, table, id, features))]
pub fn diesel_repository(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	diesel_repository::impl_diesel_repository(derive_input)
}

/// Parse a FromToSql derive macro.
/// This macro implements the traits [ToSql](https://docs.rs/diesel/2.0.2/diesel/serialize/trait.ToSql.html) and
/// [FromSql](https://docs.rs/diesel/2.0.2/diesel/deserialize/trait.FromSql.html).
///
/// Requires the 'sql_type' attribute to be set.
///
/// Single field unnamed struct will be modelized as their inner type (newtype patter)
/// Enum and named struct will be modelized as [serde_json::Value](https://docs.rs/serde_json/1.0.89/serde_json/enum.Value.html)
///
/// You may also need to derive FromSqlRow and AsExpression in order to use it in actual diesel
/// queries.
///
/// ```compile_fail
/// # #[macro_use] extern crate derive;
/// # use diesel::{FromSqlRow, AsExpression};
/// # struct InnerA;
/// # struct InnerB;
///
/// #[derive(AsExpression, FromToSql, FromSqlRow)]
/// #[sql_type = "diesel::sql_types::Uuid"]
/// struct Id(u32);
///
/// #[derive(AsExpression, FromToSql, FromSqlRow)]
/// #[sql_type = "diesel::sql_types::Jsonb"]
/// enum AOrB {
///     A(InnerA),
///     B(InnerB)
/// }
///
/// #[derive(AsExpression, FromToSql, FromSqlRow)]
/// #[sql_type = "diesel::sql_types::Jsonb"]
/// struct Person {
///     firstname: String,
///     lastname: String,
/// }
/// ```
#[proc_macro_derive(FromToSql, attributes(sql_type))]
pub fn to_sql(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	from_to_sql::impl_from_to_sql_macro(derive_input)
}

fn find_attr<T: Parse>(ast: &DeriveInput, attr_name: &str) -> T {
	ast.attrs
		.iter()
		.find(|a| a.path.is_ident(attr_name))
		.unwrap_or_else(|| panic!("{attr_name} keyword not found"))
		.parse_args()
		.unwrap_or_else(|e| panic!("Failed to parse attribute {attr_name}: {e}"))
}
