/// Struct representing a budget entity
#[derive(Debug, Insertable, Identifiable, AsChangeset, Constructor, Getters)]
pub struct Budget {
    /// The budget's ID
    id: BudgetId,
    /// The ID of the project to which the budget has been assigned
    project_id: Option<ProjectId>,
    /// The initial amount of the budget
    pub initial_amount: Decimal,
    /// The amount that remains in the budget after expenses
    pub remaining_amount: Decimal,
}

impl domain::Entity for Budget {
    /// The type of ID used by the Budget entity
    type Id = BudgetId;
}

impl<ST> Queryable<ST, Pg> for Budget
where
    (BudgetId, Option<ProjectId>, Decimal, Decimal, Decimal): Queryable<ST, Pg>,
{
    type Row = <(BudgetId, Option<ProjectId>, Decimal, Decimal, Decimal) as Queryable<ST, Pg>>::Row;

    /// Build a new Budget entity from a database row
    fn build(row: Self::Row) -> Self {
        let (id, project_id, initial_amount, remaining_amount, _) = Queryable::build(row);
        Self {
            id,
            project_id,
            initial_amount,
            remaining_amount,
        }
    }
}