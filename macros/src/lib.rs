extern crate proc_macro;

use proc_macro::TokenStream;
use syn::{parse::Parse, DeriveInput, Result};

mod diesel_repository;
mod to_sql;

#[proc_macro_derive(DieselRepository, attributes(entity, table, id))]
pub fn diesel_repository(input: TokenStream) -> TokenStream {
	diesel_repository::derive(input)
}

#[proc_macro_derive(NewtypeToSql, attributes(sql_type))]
pub fn to_sql(input: TokenStream) -> TokenStream {
	to_sql::derive(input)
}

fn find_attr<T: Parse>(ast: &DeriveInput, attr_name: &str) -> Result<T> {
	ast.attrs
		.iter()
		.find(|a| a.path.is_ident(attr_name))
		.expect("{attr_name} keyword not found")
		.parse_args()
}
