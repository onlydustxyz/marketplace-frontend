use juniper::GraphQLInputObject;

#[derive(GraphQLInputObject)]
pub struct Language {
	pub name: String,
	pub weight: i32,
}
