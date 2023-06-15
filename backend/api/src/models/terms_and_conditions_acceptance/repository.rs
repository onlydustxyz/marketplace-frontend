use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::terms_and_conditions_acceptances::dsl, Client};

use super::TermsAndConditionsAcceptance;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(TermsAndConditionsAcceptance)]
#[table(dsl::terms_and_conditions_acceptances)]
#[id(dsl::user_id)]
#[mock]
pub struct Repository(Arc<Client>);
