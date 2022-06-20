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

#[cfg(test)]
mod tests {
    use crate::model::*;
    use crate::traits::{fetcher::*, logger::*};
    use anyhow::{anyhow, Result};
    use async_trait::async_trait;
    use mockall::{mock, predicate::*};
    use std::rc::Rc;
    use std::sync::Arc;

    use super::RepositoryAnalyzer;

    mock! {
        RepoFetcher{}

        impl SyncFetcher<repository::Filter, repository::Repository> for RepoFetcher {
            fn fetch_sync(&self, filter: repository::Filter) -> Result<Vec<repository::Repository>>;
        }

        #[async_trait]
        impl AsyncFetcher<repository::Filter, repository::Repository> for RepoFetcher {
            async fn fetch_async(&self, filter: repository::Filter) -> Result<Vec<repository::Repository>>;
        }
    }

    mock! {
        RepoLogger{}

        impl SyncLogger<repository::Repository, ()> for RepoLogger {
            fn log_sync(&self, item: &repository::Repository) -> Result<()>;
        }

        #[async_trait]
        impl AsyncLogger<repository::Repository, ()> for RepoLogger {
            async fn log_async(&self, item: &repository::Repository) -> Result<()>;
        }
    }

    mock! {
        PRFetcher{}

        impl SyncFetcher<pullrequest::Filter, pullrequest::PullRequest> for PRFetcher {
            fn fetch_sync(&self, filter: pullrequest::Filter) -> Result<Vec<pullrequest::PullRequest>>;
        }

        #[async_trait]
        impl AsyncFetcher<pullrequest::Filter, pullrequest::PullRequest> for PRFetcher {
            async fn fetch_async(&self, filter: pullrequest::Filter) -> Result<Vec<pullrequest::PullRequest>>;
        }
    }

    mock! {
        PRLogger{}

        impl SyncLogger<pullrequest::PullRequest, ()> for PRLogger {
            fn log_sync(&self, item: &pullrequest::PullRequest) -> Result<()>;
        }

        #[async_trait]
        impl AsyncLogger<pullrequest::PullRequest, ()> for PRLogger {
            async fn log_async(&self, item: &pullrequest::PullRequest) -> Result<()>;
        }
    }

    #[tokio::test]
    async fn it_can_analyze_a_repository_with_sync_logger_and_fetcher() {
        let mut repo_fetcher = MockRepoFetcher::new();
        let mut repo_logger = MockRepoLogger::new();
        let mut pr_fetcher = MockPRFetcher::new();
        let mut pr_logger = MockPRLogger::new();

        let repo_filter = repository::Filter {
            owner: Some(String::from("onlydust")),
            name: Some(String::from("starkonquest")),
        };

        let repo = repository::Repository {
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        let repositories = vec![repo.clone()];

        repo_fetcher
            .expect_fetch_sync()
            .with(eq(repo_filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        repo_logger
            .expect_log_sync()
            .with(eq(repo.clone()))
            .times(1)
            .returning(|_| Ok(()));

        pr_fetcher
            .expect_fetch_sync()
            .with(eq(pullrequest::Filter {
                repository: { repo.clone() },
            }))
            .times(1)
            .returning(move |_| Ok(prs.clone()));

        pr_logger
            .expect_log_sync()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Ok(()));
        pr_logger
            .expect_log_sync()
            .with(eq(pr2.clone()))
            .times(1)
            .returning(|_| Ok(()));

        let analyzer = RepositoryAnalyzer::new(
            Fetcher::Sync(Rc::new(repo_fetcher)),
            Some(Logger::Sync(Rc::new(repo_logger))),
            Fetcher::Sync(Rc::new(pr_fetcher)),
            Logger::Sync(Rc::new(pr_logger)),
        );

        analyzer.analyze(repo_filter).await.unwrap();
    }

    #[tokio::test]
    async fn it_can_analyze_a_repository_with_async_logger_and_fetcher() {
        let mut repo_fetcher = MockRepoFetcher::new();
        let mut repo_logger = MockRepoLogger::new();
        let mut pr_fetcher = MockPRFetcher::new();
        let mut pr_logger = MockPRLogger::new();

        let repo_filter = repository::Filter {
            owner: Some(String::from("onlydust")),
            name: Some(String::from("starkonquest")),
        };

        let repo = repository::Repository {
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        let repositories = vec![repo.clone()];

        repo_fetcher
            .expect_fetch_async()
            .with(eq(repo_filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        repo_logger
            .expect_log_async()
            .with(eq(repo.clone()))
            .times(1)
            .returning(|_| Ok(()));

        pr_fetcher
            .expect_fetch_async()
            .with(eq(pullrequest::Filter {
                repository: { repo.clone() },
            }))
            .times(1)
            .returning(move |_| Ok(prs.clone()));

        pr_logger
            .expect_log_async()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Ok(()));
        pr_logger
            .expect_log_async()
            .with(eq(pr2.clone()))
            .times(1)
            .returning(|_| Ok(()));

        let analyzer = RepositoryAnalyzer::new(
            Fetcher::Async(Arc::new(repo_fetcher)),
            Some(Logger::Async(Arc::new(repo_logger))),
            Fetcher::Async(Arc::new(pr_fetcher)),
            Logger::Async(Arc::new(pr_logger)),
        );

        analyzer.analyze(repo_filter).await.unwrap();
    }

    #[tokio::test]
    async fn it_discards_error_when_repo_logging_fails() {
        let mut repo_fetcher = MockRepoFetcher::new();
        let mut repo_logger = MockRepoLogger::new();
        let mut pr_fetcher = MockPRFetcher::new();
        let mut pr_logger = MockPRLogger::new();

        let repo_filter = repository::Filter {
            owner: Some(String::from("onlydust")),
            name: Some(String::from("starkonquest")),
        };

        let repo = repository::Repository {
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        let repositories = vec![repo.clone()];

        repo_fetcher
            .expect_fetch_async()
            .with(eq(repo_filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        repo_logger
            .expect_log_async()
            .with(eq(repo.clone()))
            .times(1)
            .returning(|_| Err(anyhow!("Cannot log repository")));

        pr_fetcher
            .expect_fetch_async()
            .with(eq(pullrequest::Filter {
                repository: { repo.clone() },
            }))
            .times(1)
            .returning(move |_| Ok(prs.clone()));

        pr_logger
            .expect_log_async()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Ok(()));
        pr_logger
            .expect_log_async()
            .with(eq(pr2.clone()))
            .times(1)
            .returning(|_| Ok(()));

        let analyzer = RepositoryAnalyzer::new(
            Fetcher::Async(Arc::new(repo_fetcher)),
            Some(Logger::Async(Arc::new(repo_logger))),
            Fetcher::Async(Arc::new(pr_fetcher)),
            Logger::Async(Arc::new(pr_logger)),
        );

        analyzer.analyze(repo_filter).await.unwrap();
    }

    #[tokio::test]
    async fn it_can_analyze_all_repositories() {
        let mut repo_fetcher = MockRepoFetcher::new();
        let mut repo_logger = MockRepoLogger::new();
        let mut pr_fetcher = MockPRFetcher::new();
        let mut pr_logger = MockPRLogger::new();

        let repo_filter = repository::Filter {
            owner: None,
            name: None,
        };

        let repo = repository::Repository {
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        let repositories = vec![repo.clone()];

        repo_fetcher
            .expect_fetch_async()
            .with(eq(repo_filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        repo_logger
            .expect_log_async()
            .with(eq(repo.clone()))
            .times(1)
            .returning(|_| Err(anyhow!("Cannot log repository")));

        pr_fetcher
            .expect_fetch_async()
            .with(eq(pullrequest::Filter {
                repository: { repo.clone() },
            }))
            .times(1)
            .returning(move |_| Ok(prs.clone()));

        pr_logger
            .expect_log_async()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Ok(()));
        pr_logger
            .expect_log_async()
            .with(eq(pr2.clone()))
            .times(1)
            .returning(|_| Ok(()));

        let analyzer = RepositoryAnalyzer::new(
            Fetcher::Async(Arc::new(repo_fetcher)),
            Some(Logger::Async(Arc::new(repo_logger))),
            Fetcher::Async(Arc::new(pr_fetcher)),
            Logger::Async(Arc::new(pr_logger)),
        );

        analyzer.analyze_all().await.unwrap();
    }

    #[tokio::test]
    async fn it_stops_if_repo_fetching_fails() {
        let mut repo_fetcher = MockRepoFetcher::new();
        let repo_logger = MockRepoLogger::new();
        let pr_fetcher = MockPRFetcher::new();
        let pr_logger = MockPRLogger::new();

        let repo_filter = repository::Filter {
            owner: None,
            name: None,
        };

        repo_fetcher
            .expect_fetch_async()
            .with(eq(repo_filter.clone()))
            .times(1)
            .return_once(|_| Err(anyhow!("Repository does not exists")));

        let analyzer = RepositoryAnalyzer::new(
            Fetcher::Async(Arc::new(repo_fetcher)),
            Some(Logger::Async(Arc::new(repo_logger))),
            Fetcher::Async(Arc::new(pr_fetcher)),
            Logger::Async(Arc::new(pr_logger)),
        );

        assert_eq!(
            "Repository does not exists",
            analyzer.analyze_all().await.unwrap_err().to_string()
        );
    }

    #[tokio::test]
    async fn it_returns_error_if_pr_logging_fails() {
        let mut repo_fetcher = MockRepoFetcher::new();
        let mut pr_fetcher = MockPRFetcher::new();
        let mut pr_logger = MockPRLogger::new();

        let repo_filter = repository::Filter {
            owner: None,
            name: None,
        };

        let repo = repository::Repository {
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        let repositories = vec![repo.clone()];

        repo_fetcher
            .expect_fetch_async()
            .with(eq(repo_filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        pr_fetcher
            .expect_fetch_async()
            .with(eq(pullrequest::Filter {
                repository: { repo.clone() },
            }))
            .times(1)
            .returning(move |_| Ok(prs.clone()));

        pr_logger
            .expect_log_async()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Err(anyhow!("Unable to log PR#1")));

        let analyzer = RepositoryAnalyzer::new(
            Fetcher::Async(Arc::new(repo_fetcher)),
            None,
            Fetcher::Async(Arc::new(pr_fetcher)),
            Logger::Async(Arc::new(pr_logger)),
        );

        assert_eq!(
            "Unable to log PR#1",
            analyzer.analyze_all().await.unwrap_err().to_string()
        );
    }
}
