use super::find_attr;
use derive_getters::Dissolve;
use proc_macro::TokenStream;
use quote::quote;
use syn::{
	parse::{Parse, ParseStream},
	parse_macro_input, DeriveInput, Ident, Result, TypePath,
};

#[derive(Dissolve)]
struct Input {
	repository_name: Ident,
	projection_type: TypePath,
	table: TypePath,
	id: TypePath,
}

/**
 * Parse a Diesel Repository derive macro
 *
 * #[derive(DieselRepository)]
 * #[projection(Payment)]
 * #[table(infrastructure::database::schema::payments::dsl::payments)]
 * #[id(infrastructure::database::schema::payments::dsl::id)]
 * struct Repository(Client);
 */
impl Parse for Input {
	fn parse(input: ParseStream) -> Result<Self> {
		let ast: DeriveInput = input.parse()?;

		Ok(Self {
			repository_name: ast.ident.clone(),
			projection_type: find_attr(&ast, "projection")?,
			table: find_attr(&ast, "table")?,
			id: find_attr(&ast, "id")?,
		})
	}
}

pub fn derive(input: TokenStream) -> TokenStream {
	// Parse the input into an ast
	let input = parse_macro_input!(input as Input);
	let (repository_name, projection_type, table, id) = input.dissolve();

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		use crate::diesel::RunQueryDsl;
		use crate::diesel::ExpressionMethods;

		impl crate::domain::ProjectionRepository<#projection_type> for #repository_name {
			fn insert(&self, projection: &#projection_type) -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table).values(projection).execute(&*connection)?;
				Ok(())
			}

			fn update(&self, id: &<#projection_type as crate::domain::Projection>::Id, projection: &#projection_type) -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::update(#table)
					.filter(#id.eq(id))
					.set(projection)
					.execute(&*connection)?;
				Ok(())
			}

			fn delete(&self, id: &<#projection_type as crate::domain::Projection>::Id) -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::delete(#table).filter(#id.eq(id)).execute(&*connection)?;
				Ok(())
			}

			fn clear(&self) -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::delete(#table).execute(&*connection)?;
				Ok(())
			}
		}
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}
