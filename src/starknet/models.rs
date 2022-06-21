use std::time::SystemTime;

pub struct ContractUpdateStatus {
    pub pr_id: String,
    pub last_update_time: SystemTime,
}

impl ContractUpdateStatus {
    pub fn new(pr_id: String) -> Self {
        ContractUpdateStatus {
            pr_id,
            last_update_time: SystemTime::now(),
        }
    }
}

impl Default for ContractUpdateStatus {
    fn default() -> Self {
        ContractUpdateStatus {
            pr_id: String::from("0"),
            last_update_time: SystemTime::now(),
        }
    }
}
