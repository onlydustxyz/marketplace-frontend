use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::user_payout_info::dsl, Client};

use crate::models::UserPayoutInfo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(UserPayoutInfo)]
#[table(dsl::user_payout_info)]
#[id(dsl::user_id)]
#[mock]
pub struct Repository(Arc<Client>);
