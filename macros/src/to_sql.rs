use derive_getters::Dissolve;
use proc_macro::TokenStream;
use quote::quote;
use syn::{
	parse::{Parse, ParseStream},
	parse_macro_input, DeriveInput, Field, Ident, Meta, Result, Type, TypePath,
};

#[derive(Dissolve)]
struct Input {
	new_type: Ident,
	inner_type: TypePath,
	sql_type: syn::Type,
}

/**
 * Parse a NewtypeToSql derive macro.
 * This macro implements the trait diesel::serialize::ToSql for any struct following the newtype
 * idiom. Requires the 'sql_type' attribute to be set. The struct should also derive
 * AsExpression.
 *
 * #[derive(AsExpression, NewtypeToSql)]
 * #[sql_type = "diesel::sql_types::Uuid"]
 * struct Id(uuid::Uuid);
 */
impl Parse for Input {
	fn parse(input: ParseStream) -> Result<Self> {
		let ast: DeriveInput = input.parse()?;

		Ok(Self {
			new_type: ast.ident.clone(),
			inner_type: get_inner_type(&ast),
			sql_type: get_sql_type(&ast),
		})
	}
}

fn get_sql_type(ast: &DeriveInput) -> Type {
	let sql_type = ast
		.attrs
		.iter()
		.find(|a| a.path.is_ident("sql_type"))
		.expect("sql_type attribute is required");

	let sql_type = match sql_type.parse_meta().unwrap() {
		Meta::NameValue(ref name_value) => match &name_value.lit {
			syn::Lit::Str(s) => s.clone(),
			_ => panic!("sql_type must be in the form `sql_type = \"value\"`"),
		},
		_ => panic!("sql_type must be in the form `sql_type = \"value\"`"),
	};

	sql_type.parse().expect("Invalid Rust type")
}

fn get_inner_type(ast: &DeriveInput) -> TypePath {
	const NEWTYPE_ERROR: &str = "Excpected struct with a single unnamed field (newtype pattern)";

	let inner_field = match ast.data {
		syn::Data::Struct(ref data) => match data.fields {
			syn::Fields::Unnamed(ref fields) => {
				assert_eq!(fields.unnamed.clone().len(), 1, "{}", NEWTYPE_ERROR);
				let unnamed: Field = fields.unnamed.first().expect(NEWTYPE_ERROR).clone();
				unnamed
			},
			_ => panic!("{}", NEWTYPE_ERROR),
		},
		_ => panic!("{}", NEWTYPE_ERROR),
	};

	match inner_field.ty {
		syn::Type::Path(path) => path,
		_ => panic!("{}", NEWTYPE_ERROR),
	}
}

pub fn derive(input: TokenStream) -> TokenStream {
	// Parse the input into an ast
	let input = parse_macro_input!(input as Input);
	let (new_type, inner_type, sql_type) = input.dissolve();

	// Build the output, possibly using quasi-quotation
	let expanded = quote! {
		impl<DB> diesel::serialize::ToSql<#sql_type, DB> for #new_type
		where
			DB: diesel::backend::Backend,
			#inner_type: diesel::types::ToSql<#sql_type, DB>,
		{
			fn to_sql<W: std::io::Write>(&self, out: &mut diesel::serialize::Output<W, DB>) -> diesel::serialize::Result {
				self.0.to_sql(out)
			}
		}
	};

	// Hand the output tokens back to the compiler
	TokenStream::from(expanded)
}
