extern crate proc_macro;

use proc_macro::TokenStream;
use syn::{parse::Parse, DeriveInput, Result};

mod diesel_mapping_repository;
mod diesel_repository;
mod from_to_sql;

#[proc_macro_derive(DieselMappingRepository, attributes(table, entities, ids))]
pub fn diesel_mapping_repository(input: TokenStream) -> TokenStream {
	diesel_mapping_repository::derive(input)
}

#[proc_macro_derive(DieselRepository, attributes(entity, table, id))]
pub fn diesel_repository(input: TokenStream) -> TokenStream {
	diesel_repository::derive(input)
}

/// Parse a FromToSql derive macro.
/// This macro implements the traits [ToSql](https://docs.rs/diesel/2.0.2/diesel/serialize/trait.ToSql.html) and
/// [FromSql](https://docs.rs/diesel/2.0.2/diesel/deserialize/trait.FromSql.html). Requires the 'sql_type' attribute to be set.
/// Single field unnamed struct will be modelized as their inner type (newtype patter)
/// Enum and named struct will be modelized as [serde_json::Value](https://docs.rs/serde_json/1.0.89/serde_json/enum.Value.html)
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
	let ast: DeriveInput = syn::parse(input).unwrap();
	from_to_sql::impl_from_to_sql_macro(ast)
}

fn find_attr<T: Parse>(ast: &DeriveInput, attr_name: &str) -> Result<T> {
	ast.attrs
		.iter()
		.find(|a| a.path.is_ident(attr_name))
		.unwrap_or_else(|| panic!("{attr_name} keyword not found"))
		.parse_args()
}
