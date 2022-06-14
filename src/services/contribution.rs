use crate::db::{
    self,
    models::*,
    schema::projects::{self, dsl::*},
};
use crate::model::github::RepositoryWithExtension;
use crate::starknet::contribution_contract::ContributionStarknetContractClient;
use anyhow::{anyhow, Result};
use diesel::prelude::*;
use log::debug;

const GITHUB_API_ROOT: &str = "https://api.github.com";
const MAX_PR_PER_PAGE: u8 = 100;

pub struct RepoAnalyzer {
    pub contribution_contract_client: ContributionStarknetContractClient,
}

impl RepoAnalyzer {
    pub fn new(contribution_contract_client: ContributionStarknetContractClient) -> Self {
        Self {
            contribution_contract_client,
        }
    }

    pub async fn analyze(&self, organisation_name: &str, repository_name: &str) -> Result<()> {
        debug!(
            "Entering analyze with args: {} - {}",
            organisation_name, repository_name
        );
        let connection = db::establish_connection()?;
        let octo = octocrab::instance();

        // Check if repo exists
        let _repo = octo
            .get::<RepositoryWithExtension, String, ()>(
                format!(
                    "{}/repos/{}/{}",
                    GITHUB_API_ROOT, organisation_name, repository_name
                ),
                None::<&()>,
            )
            .await?;

        // Find project in database
        let results = projects
            .filter(organisation.eq(organisation_name))
            .filter(repository.eq(repository_name))
            .limit(1)
            .load::<Project>(&connection)
            .expect("Error loading projects");
        // Create project if not exist
        if results.is_empty() {
            self.create_project(&connection, organisation_name, repository_name)?;
        }

        // List the closed PRs
        let mut current_page = octo
            .pulls(organisation_name, repository_name)
            .list()
            .state(octocrab::params::State::Closed)
            .direction(octocrab::params::Direction::Ascending)
            .per_page(MAX_PR_PER_PAGE)
            .send()
            .await?;
        let mut prs = current_page.take_items();
        while let Ok(Some(mut new_page)) = octo.get_page(&current_page.next).await {
            prs.extend(new_page.take_items());
            current_page = new_page;
        }

        for pr in prs.drain(..) {
            // TODO: check if PR exists in DB
            // TODO: invoke smart contract to update state
            // TODO: update DB
            let is_merged = pr.merged_at.is_some();
            let pr_id = pr.id;
            let author = pr.user.unwrap().login;
            // Process only merged PRs
            if is_merged {
                self.process_merged_pr(
                    organisation_name,
                    repository_name,
                    author,
                    pr_id.as_ref().to_string(),
                )
                .await?;
            }
        }
        Ok(())
    }

    async fn process_merged_pr(
        &self,
        organisation_name: &str,
        repository_name: &str,
        author: String,
        pr_id: String,
    ) -> Result<()> {
        println!("PR #{} was merged by: {}", pr_id, author);
        // TODO: return result when smart contract interaction works
        let _result = self
            .contribution_contract_client
            .register_contribution(organisation_name, repository_name, author, pr_id)
            .await
            .map_err(anyhow::Error::msg);
        Ok(())
    }

    fn create_project(
        &self,
        conn: &PgConnection,
        organisation_name: &str,
        repository_name: &str,
    ) -> Result<Project> {
        let new_project = NewProject {
            organisation: String::from(organisation_name),
            repository: String::from(repository_name),
        };
        diesel::insert_into(projects::table)
            .values(&new_project)
            .get_result(conn)
            .map_err(|e| anyhow!(e))
    }
}
