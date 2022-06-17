use anyhow::Result;
use log::warn;

use crate::{
    model::{pullrequest, repository},
    traits::{fetcher::Fetcher, logger::Logger},
};

pub struct RepositoryAnalyzer {
    repo_fetcher: Fetcher<repository::Filter, repository::Repository>,
    repo_logger: Option<Logger<repository::Repository, ()>>,
    pr_fetcher: Fetcher<pullrequest::Filter, pullrequest::PullRequest>,
    pr_logger: Logger<Vec<pullrequest::PullRequest>, Vec<()>>,
}

impl RepositoryAnalyzer {
    pub fn new(
        repo_fetcher: Fetcher<repository::Filter, repository::Repository>,
        repo_logger: Option<Logger<repository::Repository, ()>>,
        pr_fetcher: Fetcher<pullrequest::Filter, pullrequest::PullRequest>,
        pr_logger: Logger<Vec<pullrequest::PullRequest>, Vec<()>>,
    ) -> Self {
        Self {
            repo_fetcher,
            repo_logger,
            pr_fetcher,
            pr_logger,
        }
    }

    pub async fn analyze_all(&self) -> Result<()> {
        const ALL: repository::Filter = repository::Filter {
            owner: None,
            name: None,
        };

        self.analyze(ALL).await
    }

    pub async fn analyze(&self, filter: repository::Filter) -> Result<()> {
        for repository in self.repo_fetcher.fetch(filter).await? {
            if let Some(repo_logger) = &self.repo_logger {
                if let Err(error) = repo_logger.log(&repository).await {
                    warn!("Unable to log repository in database: {}", error);
                }
            }

            let pullrequests = self
                .pr_fetcher
                .fetch(pullrequest::Filter { repository })
                .await?;
            self.pr_logger.log(&pullrequests).await?;
        }

        Ok(())
    }
}
