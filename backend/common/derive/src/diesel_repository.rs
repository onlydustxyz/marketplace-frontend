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
	entity_type: TypePath,
	table: TypePath,
	id: TypePath,
}

/**
 * Parse a Diesel Repository derive macro
 *
 * #[derive(DieselRepository)]
 * #[entity(Payment)]
 * #[table(infrastructure::database::schema::payments::dsl::payments)]
 * #[id(infrastructure::database::schema::payments::dsl::id)]
 * struct Repository(Client);
 */
impl Parse for Input {
	fn parse(input: ParseStream) -> Result<Self> {
		let ast: DeriveInput = input.parse()?;

		Ok(Self {
			repository_name: ast.ident.clone(),
			entity_type: find_attr(&ast, "entity")?,
			table: find_attr(&ast, "table")?,
			id: find_attr(&ast, "id")?,
		})
	}
}

pub fn derive(input: TokenStream) -> TokenStream {
	// Parse the input into an ast
	let input = parse_macro_input!(input as Input);
	let (repository_name, entity_type, table, id) = input.dissolve();

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		use crate::diesel::RunQueryDsl;
		use crate::diesel::ExpressionMethods;
		use crate::diesel::query_dsl::filter_dsl::FindDsl;

		impl ::domain::EntityRepository<#entity_type> for #repository_name {
			fn find_by_id(&self, id: &<#entity_type as ::domain::Entity>::Id) -> anyhow::Result<#entity_type> {
				let connection = self.0.connection()?;
				let entity = #table.find(*id).first(&*connection)?;
				Ok(entity)
			}

			fn insert(&self, entity: &#entity_type) -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table).values(entity).execute(&*connection)?;
				Ok(())
			}

			fn update(&self, id: &<#entity_type as ::domain::Entity>::Id, entity: &#entity_type) -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::update(#table)
					.filter(#id.eq(id))
					.set(entity)
					.execute(&*connection)?;
				Ok(())
			}

			fn upsert(&self, entity: &#entity_type)  -> anyhow::Result<()> {
				let connection = self.0.connection()?;
				diesel::insert_into(#table)
					.values(entity)
					.on_conflict(#id)
					.do_update()
					.set(entity)
					.execute(&*connection)?;
				Ok(())
			}

			fn delete(&self, id: &<#entity_type as ::domain::Entity>::Id) -> anyhow::Result<()> {
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
