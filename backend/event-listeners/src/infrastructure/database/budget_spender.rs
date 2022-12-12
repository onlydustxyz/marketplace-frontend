use crate::domain::BudgetSpenderRepository;
use domain::{Budget, User};
use infrastructure::database::{schema::budget_spenders::dsl, Client};
use std::sync::Arc;

#[derive(new, DieselMappingRepository)]
#[entities((Budget, User))]
#[ids((dsl::budget_id, dsl::user_id))]
#[table(dsl::budget_spenders)]
pub struct Repository(Arc<Client>);

impl BudgetSpenderRepository for Repository {}
