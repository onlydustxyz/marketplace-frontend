use crate::db::{
    self,
    models::*,
    schema::{
        projects::{self, dsl::*},
        pull_requests::{self, dsl::*},
    },
};
use crate::model::github::{PullRequestStatus, RepositoryWithExtension};
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
            let is_merged = pr.merged_at.is_some();
            let pr_id_ = pr.id;
            let author_ = pr.user.unwrap().login;
            // Process only merged PRs
            if is_merged {
                self.process_merged_pr(
                    &connection,
                    organisation_name,
                    repository_name,
                    author_,
                    pr_id_.as_ref().to_string(),
                )
                .await?;
            }
        }
        Ok(())
    }

    async fn process_merged_pr(
        &self,
        connection: &PgConnection,
        organisation_name: &str,
        repository_name: &str,
        author_: String,
        pr_id_: String,
    ) -> Result<()> {
        println!("PR #{} was merged by: {}", &pr_id_, author_);
        let result: Result<PullRequest> = pull_requests
            .find(pr_id_.clone())
            .first(connection)
            .map_err(anyhow::Error::msg);
        let mut need_to_register_on_smart_contract = false;
        let pr: Option<PullRequest>;
        match result {
            // PR exists in DB
            Ok(pr_in_db) => {
                pr = Some(pr_in_db.clone());
                // PR exists but not registered on smart contract
                if pr_in_db.pr_smart_contract_status != PullRequestStatus::Merged.to_string() {
                    need_to_register_on_smart_contract = true;
                }
            }
            // PR does not exist in DB
            Err(_) => {
                // Insert the PR in DB
                pr = Some(self.create_pull_request(
                    connection,
                    pr_id_.clone(),
                    author_.clone(),
                    PullRequestStatus::Merged.to_string(),
                    PullRequestStatus::None.to_string(),
                )?);
                need_to_register_on_smart_contract = true;
            }
        };
        if need_to_register_on_smart_contract {
            let result = self
                .contribution_contract_client
                .register_contribution(organisation_name, repository_name, author_, pr_id_)
                .await
                .map_err(anyhow::Error::msg);

            // TODO: better error handling
            // Maybe we should add columns in table to store error messages
            let new_pr_smart_contract_status = match result {
                Ok(_) => PullRequestStatus::Merged,
                Err(_) => PullRequestStatus::SmartContractError,
            };

            // Need to update DB accordingly
            // pr is either the returned value from the find query
            // or the freshly created value after insert
            let pr = pr.unwrap();
            let pr_form = PullRequestForm {
                id: pr.id,
                author: pr.author,
                pr_status: pr.pr_status,
                pr_smart_contract_status: new_pr_smart_contract_status.to_string(),
            };
            pr_form.save_changes::<PullRequest>(connection)?;
        }
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

    fn create_pull_request(
        &self,
        conn: &PgConnection,
        pr_id_: String,
        author_: String,
        pr_status_: String,
        pr_smart_contract_status_: String,
    ) -> Result<PullRequest> {
        let new_pull_request = NewPullRequest {
            id: pr_id_,
            author: author_,
            pr_status: pr_status_,
            pr_smart_contract_status: pr_smart_contract_status_,
        };
        diesel::insert_into(pull_requests::table)
            .values(&new_pull_request)
            .get_result(conn)
            .map_err(|e| anyhow!(e))
    }
}
