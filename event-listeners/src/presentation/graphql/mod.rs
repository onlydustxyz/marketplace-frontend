mod query;
use query::Query;

mod mutation;
use mutation::Mutation;

mod context;
pub use context::Context;

use juniper::{EmptySubscription, RootNode};

pub type Schema = RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

pub fn create_schema() -> Schema {
	Schema::new(Query, Mutation, EmptySubscription::new())
}
