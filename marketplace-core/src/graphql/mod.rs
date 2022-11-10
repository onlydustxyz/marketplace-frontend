mod query;
use query::Query;

mod mutation;
use mutation::Mutation;

use juniper::{EmptySubscription, RootNode};

pub type Schema = RootNode<'static, Query, Mutation, EmptySubscription<()>>;

pub fn create_schema() -> Schema {
	Schema::new(Query, Mutation, EmptySubscription::new())
}
