use proc_macro::TokenStream;
use quote::quote;

pub fn impl_from_to_sql_macro(derive_input: syn::DeriveInput) -> TokenStream {
	let derivation_pattern = deduce_derivation_pattern(derive_input);
	derivation_pattern.expand()
}

enum DerivationPattern {
	NewTypePattern {
		derived_on_type: syn::Ident,
		inner_type: syn::TypePath,
		sql_type: syn::Type,
	},
	Others {
		derived_on_type: syn::Ident,
		sql_type: syn::Type,
	},
}

impl DerivationPattern {
	fn expand(self) -> TokenStream {
		let expanded = match self {
			DerivationPattern::NewTypePattern {
				derived_on_type,
				inner_type,
				sql_type,
			} => quote!(
				impl<DB> diesel::serialize::ToSql<#sql_type, DB> for #derived_on_type
				where
					DB: diesel::backend::Backend,
					#inner_type: diesel::types::ToSql<#sql_type, DB>,
				{
					fn to_sql<W: std::io::Write>(&self, out: &mut diesel::serialize::Output<W, DB>) -> diesel::serialize::Result {
						self.0.to_sql(out)
					}
				}

				impl<A, DB> diesel::deserialize::FromSql<A, DB> for #derived_on_type
				where
					DB: diesel::backend::Backend,
					#inner_type: diesel::deserialize::FromSql<A, DB>,
				{
					fn from_sql(
						bytes: Option<&DB::RawValue>,
					) -> diesel::deserialize::Result<Self> {
						#inner_type::from_sql(bytes).map(#derived_on_type)
					}
				}
			),
			DerivationPattern::Others {
				derived_on_type,
				sql_type,
			} => quote!(
				impl diesel::serialize::ToSql<#sql_type, diesel::pg::Pg> for #derived_on_type
				{
					fn to_sql<W: std::io::Write>(&self, out: &mut diesel::serialize::Output<W, diesel::pg::Pg>) -> diesel::serialize::Result {
						let json_value = serde_json::to_value(&self)?;
						<serde_json::Value as diesel::serialize::ToSql<#sql_type, diesel::pg::Pg>>::to_sql(&json_value, out)
					}
				}

				impl<A> diesel::deserialize::FromSql<A, diesel::pg::Pg> for #derived_on_type
				where
					serde_json::Value: diesel::deserialize::FromSql<A, diesel::pg::Pg>,
				{
					fn from_sql(
						bytes: Option<&<diesel::pg::Pg as diesel::backend::Backend>::RawValue>,
					) -> diesel::deserialize::Result<Self> {
						let json_value = serde_json::Value::from_sql(bytes)?;
						serde_json::from_value(json_value).map_err(|e| e.into())
					}
				}
			),
		};

		TokenStream::from(expanded)
	}
}

fn deduce_derivation_pattern(ast: syn::DeriveInput) -> DerivationPattern {
	const INVALID_TYPE_TO_DERIVE_ON_ERROR: &str =
		"Expected a single field unnamed struct or a named struct";
	const MULTI_FIELD_UNNAMED_STRUCT_ERROR: &str = "Unnamed struct should only contain one field";

	let derived_on_type = ast.ident.clone();
	let sql_type = get_sql_type(&ast);

	match ast.data {
		syn::Data::Struct(ref data_struct) => match data_struct.fields {
			syn::Fields::Named(_) => DerivationPattern::Others {
				derived_on_type,
				sql_type,
			},
			syn::Fields::Unnamed(ref fields) => {
				assert_eq!(
					fields.unnamed.len(),
					1,
					"{}",
					MULTI_FIELD_UNNAMED_STRUCT_ERROR
				);
				match &fields.unnamed.first().expect(MULTI_FIELD_UNNAMED_STRUCT_ERROR).ty {
					syn::Type::Path(path) => DerivationPattern::NewTypePattern {
						derived_on_type,
						inner_type: path.clone(),
						sql_type,
					},
					_ => panic!("{}", INVALID_TYPE_TO_DERIVE_ON_ERROR),
				}
			},
			_ => panic!("{}", INVALID_TYPE_TO_DERIVE_ON_ERROR),
		},
		syn::Data::Enum(_) => DerivationPattern::Others {
			derived_on_type,
			sql_type,
		},
		_ => panic!("{}", INVALID_TYPE_TO_DERIVE_ON_ERROR),
	}
}

fn get_sql_type(ast: &syn::DeriveInput) -> syn::Type {
	const MISSING_ATTRIBUTE_ERROR: &str = "sql_type attribute is required";
	const INVALID_ATTRIBUTE_ERROR: &str = "sql_type must be in the form `sql_type = \"value\"`";
	const INVALID_RUST_TYPE_ERROR: &str = "Invalid Rust type";

	let sql_type = ast
		.attrs
		.iter()
		.find(|a| a.path.is_ident("sql_type"))
		.expect(MISSING_ATTRIBUTE_ERROR);

	let sql_type = match sql_type.parse_meta().unwrap() {
		syn::Meta::NameValue(ref name_value) => match &name_value.lit {
			syn::Lit::Str(s) => s.clone(),
			_ => panic!("{}", INVALID_ATTRIBUTE_ERROR),
		},
		_ => panic!("{}", INVALID_ATTRIBUTE_ERROR),
	};

	sql_type.parse().expect(INVALID_RUST_TYPE_ERROR)
}
