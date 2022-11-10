mod query;
use query::Query;

use juniper::{EmptyMutation, EmptySubscription, RootNode};

pub type Schema = RootNode<'static, Query, EmptyMutation<()>, EmptySubscription<()>>;

pub fn create_schema() -> Schema {
	Schema::new(Query, EmptyMutation::new(), EmptySubscription::new())
}
