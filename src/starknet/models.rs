pub struct ContractUpdateStatus {
    pub pr_id: String,
    pub transaction_hash: String,
}

impl ContractUpdateStatus {
    pub fn new(pr_id: String, transaction_hash: String) -> Self {
        ContractUpdateStatus {
            pr_id,
            transaction_hash,
        }
    }
}
