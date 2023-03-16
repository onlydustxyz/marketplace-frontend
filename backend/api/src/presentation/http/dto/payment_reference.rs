use derive_getters::Getters;
use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject, Getters)]
pub struct PaymentReference {
	project_id: Uuid,
	payment_id: Uuid,
}
