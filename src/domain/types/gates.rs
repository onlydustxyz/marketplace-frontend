pub type Id = String;

#[derive(Debug, PartialEq, Clone)]
pub struct ContributionGate<ContributionId, GateId> {
    pub id: Id,
    pub contribution_id: ContributionId,
    pub gate_id: GateId,
    pub transaction_hash: String,
}
