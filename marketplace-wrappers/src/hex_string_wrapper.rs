use proc_macro::TokenStream;
use quote::quote;

pub fn impl_hex_string_wrapper_macro(ast: &syn::DeriveInput) -> TokenStream {
	let name = &ast.ident;
	let gen = quote! {
		impl FromStr for #name {
			type Err = ParseHexPrefixedStringError;

			fn from_str(s: &str) -> Result<Self, Self::Err> {
				HexPrefixedString::from_str(s).map(Self)
			}
		}

		impl From<U256> for #name {
			fn from(v: U256) -> Self {
				Self(HexPrefixedString::from(v))
			}
		}

		impl From<u128> for #name {
			fn from(id: u128) -> Self {
				U256::from_u128(id).into()
			}
		}

		impl From<HexPrefixedString> for #name {
			fn from(id: HexPrefixedString) -> Self {
				Self(id)
			}
		}

		impl Display for #name {
			fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
				self.0.fmt(f)
			}
		}
	};
	gen.into()
}
