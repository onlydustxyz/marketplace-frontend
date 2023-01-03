mod query;
use query::Query;

mod error;
pub use error::{Error, Result};

mod context;
pub use context::Context;
use juniper::{EmptyMutation, EmptySubscription, RootNode};

pub type Schema = RootNode<'static, Query, EmptyMutation<Context>, EmptySubscription<Context>>;

pub fn create_schema() -> Schema {
	Schema::new(Query, EmptyMutation::new(), EmptySubscription::new())
}
