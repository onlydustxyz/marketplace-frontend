use super::{models, schema::contributions, Client};
use crate::domain::*;
use diesel::prelude::*;

impl ContributionRepository for Client {
    fn store(&self, contribution: Contribution, transaction_hash: String) -> Result<()> {
        let contribution = models::NewContribution::from((contribution, transaction_hash));
        diesel::insert_into(contributions::table)
            .values(&contribution)
            .get_result::<models::Contribution>(self.connection())
            .map_err(|e| Error::ContributionStoreError(e.to_string()))?;

        Ok(())
    }

    fn update_contributor_and_status(
        &self,
        contribution_id: ContributionId,
        contributor_id_: Option<ContributorId>,
        status_: ContributionStatus,
        transaction_hash_: String,
    ) -> Result<()> {
        models::AssignContributionForm {
            id: contribution_id,
            status: status_.to_string(),
            contributor_id: match contributor_id_ {
                Some(id_) => id_.to_string(),
                None => String::new(),
            },
            transaction_hash: transaction_hash_,
        }
        .save_changes::<models::Contribution>(self.connection())
        .map_err(|e| Error::ContributionStoreError(e.to_string()))?;

        Ok(())
    }

    fn update_status(
        &self,
        contribution_id: ContributionId,
        status_: ContributionStatus,
        transaction_hash_: String,
    ) -> Result<()> {
        models::ValidateContributionForm {
            id: contribution_id,
            status: status_.to_string(),
            transaction_hash: transaction_hash_,
        }
        .save_changes::<models::Contribution>(self.connection())
        .map_err(|e| Error::ContributionStoreError(e.to_string()))?;

        Ok(())
    }
}

impl From<(Contribution, String)> for models::NewContribution {
    fn from((contribution, transaction_hash): (Contribution, String)) -> Self {
        Self {
            id: contribution.id,
            project_id: contribution.project_id,
            status: contribution.status.to_string(),
            contributor_id: contribution
                .contributor_id
                .map_or(String::new(), |id| id.to_string()),
            gate: contribution.gate as i16,
            transaction_hash,
            title: contribution.title,
            description: contribution.description,
            external_link: contribution.external_link.map(|link| link.to_string()),
            difficulty: contribution.metadata.difficulty,
            technology: contribution.metadata.technology,
            duration: contribution.metadata.duration,
            context: contribution.metadata.context,
            type_: contribution.metadata.r#type,
        }
    }
}
