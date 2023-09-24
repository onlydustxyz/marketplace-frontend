extern crate proc_macro;

use proc_macro::TokenStream;
use syn::DeriveInput;

mod diesel_immutable_model;
mod diesel_model;

/// Implements the `Model` trait for this struct using Diesel.
/// The struct must also derive other diesel traits.
/// This macro automatically derive `ImmutableModel`
///
/// ```compile_fail
/// #[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model)]
/// pub struct ProjectDetails {
///     project_id: ProjectId,
///     name: String
/// }
/// ```
#[proc_macro_derive(Model)]
pub fn derive_model(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	let mut stream = diesel_model::impl_derive(derive_input.clone());
	stream.extend(diesel_immutable_model::impl_derive(derive_input));
	stream
}

/// Implements the `ImmutableModel` trait for this struct using Diesel.
/// This derive does not generate the update functions and so does not require the struct to
/// implement AsChangeset. This is useful for mapping tables that contains only primary keys.
/// The struct must also derive other diesel traits.
///
/// ```compile_fail
/// #[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
/// #[diesel(primary_key(project_id, github_repo_id))]
/// pub struct ProjectGithubRepo {
///     project_id: ProjectId,
///     github_repo_id: GithubRepoId
/// }
/// ```
#[proc_macro_derive(ImmutableModel)]
pub fn derive_immutable_model(input: TokenStream) -> TokenStream {
	let derive_input: DeriveInput = syn::parse(input).unwrap();
	diesel_immutable_model::impl_derive(derive_input)
}
