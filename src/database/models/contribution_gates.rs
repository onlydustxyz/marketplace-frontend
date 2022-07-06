use anyhow::anyhow;
use std::str::FromStr;

use crate::{database::schema::*, domain};
use rocket::serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct ContributionGate {
    pub id: String,
    pub contribution_id: String,
    pub gate_id: String,
    pub transaction_hash: String,
}

#[derive(Insertable)]
#[table_name = "contribution_gates"]
pub struct NewContributionGate {
    pub contribution_id: String,
    pub gate_id: String,
    pub transaction_hash: String,
}

impl<ContributionId: FromStr, GateId: FromStr> TryFrom<ContributionGate>
    for domain::ContributionGate<ContributionId, GateId>
{
    type Error = anyhow::Error;

    fn try_from(gate: ContributionGate) -> Result<Self, Self::Error> {
        let contribution_id = ContributionId::from_str(&gate.contribution_id)
            .map_err(|_| anyhow!("failed to convert to ContributionId"))?;

        let gate_id =
            GateId::from_str(&gate.gate_id).map_err(|_| anyhow!("failed to convert to GateId"))?;

        Ok(Self {
            id: gate.id,
            contribution_id,
            gate_id,
            transaction_hash: gate.transaction_hash,
        })
    }
}
