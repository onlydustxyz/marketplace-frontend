use super::find_attr;
use derive_getters::Dissolve;
use proc_macro::TokenStream;
use quote::quote;
use syn::{
	parse::{Parse, ParseStream},
	parse_macro_input, DeriveInput, Ident, Result, Type, TypePath, TypeTuple,
};

#[derive(Dissolve)]
struct Input {
	repository_name: Ident,
	table: TypePath,
	entity1: TypePath,
	entity2: TypePath,
	id1: TypePath,
	id2: TypePath,
}

trait AsPath {
	fn as_path(&self) -> TypePath;
}

impl AsPath for Type {
	fn as_path(&self) -> TypePath {
		match self {
			Type::Path(path) => path.clone(),
			_ => panic!("TypePath required"),
		}
	}
}

/**
 * Parse a Diesel Mapping Repository derive macro
 *
 * #[derive(DieselMappingRepository)]
 * #[entities(Project,User)]
 * #[ids(dsl::project_id,dsl::user_id)]
 * #[table(infrastructure::database::schema::payments::dsl::project_leads)]
 * struct Repository(Client);
 */
impl Parse for Input {
	fn parse(input: ParseStream) -> Result<Self> {
		let ast: DeriveInput = input.parse()?;

		let entities: TypeTuple = find_attr(&ast, "entities")?;
		assert_eq!(
			entities.elems.len(),
			2,
			"DieselMappingRepository only support mapping with 2 entities"
		);
		let ids: TypeTuple = find_attr(&ast, "ids")?;
		assert_eq!(
			entities.elems.len(),
			ids.elems.len(),
			"Same length of entities and ids required"
		);

		Ok(Self {
			repository_name: ast.ident.clone(),
			table: find_attr(&ast, "table")?,
			entity1: entities.elems.first().unwrap().as_path(),
			entity2: entities.elems.last().unwrap().as_path(),
			id1: ids.elems.first().unwrap().as_path(),
			id2: ids.elems.last().unwrap().as_path(),
		})
	}
}

pub fn derive(input: TokenStream) -> TokenStream {
	// Parse the input into an ast
	let input = parse_macro_input!(input as Input);
	let (repository_name, table, entity1, entity2, id1, id2) = input.dissolve();

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		use crate::diesel::RunQueryDsl;
		use crate::diesel::ExpressionMethods;
		use crate::diesel::query_dsl::filter_dsl::FindDsl;

		impl domain::MappingRepository<#entity1, #entity2> for #repository_name {
			fn insert(&self, id1: &<#entity1 as domain::Entity>::Id, id2: &<#entity2 as domain::Entity>::Id) -> anyhow::Result<()> {
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
