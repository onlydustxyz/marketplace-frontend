use diesel::Identifiable;
use domain::{BudgetId, ProjectId};
use infrastructure::database::schema::projects_budgets;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Serialize, Deserialize, Queryable, Identifiable, ImmutableModel,
)]
#[diesel(primary_key(project_id, budget_id))]
pub struct ProjectsBudget {
	pub project_id: ProjectId,
	pub budget_id: BudgetId,
}

impl Identifiable for ProjectsBudget {
	type Id = (ProjectId, BudgetId);

	fn id(self) -> Self::Id {
		(self.project_id, self.budget_id)
	}
}
