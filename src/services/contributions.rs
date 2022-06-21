use anyhow::Result;

use crate::traits::{fetcher::Fetcher, logger::Logger};

pub async fn fetch_and_log<Filter, Item>(
    fetcher: Fetcher<Filter, Item>,
    logger: Logger<Vec<Item>, Vec<()>>,
    filter: Filter,
) -> Result<()> {
    let items = fetcher.fetch(filter).await?;
    logger.log(&items).await?;
    Ok(())
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

    use super::*;

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
    async fn it_can_fetch_and_log_repositories_sync_mode() {
        let mut fetcher = MockRepoFetcher::new();
        let mut logger = MockRepoLogger::new();

        let filter = repository::Filter {
            owner: Some(String::from("onlydust")),
            name: Some(String::from("starkonquest")),
        };

        let repo = repository::Repository {
            id: String::from("42"),
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let repositories = vec![repo.clone()];

        fetcher
            .expect_fetch_sync()
            .with(eq(filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        logger
            .expect_log_sync()
            .with(eq(repo.clone()))
            .times(1)
            .returning(|_| Ok(()));

        fetch_and_log(
            Fetcher::Sync(Rc::new(fetcher)),
            Logger::Sync(Rc::new(logger)),
            filter,
        )
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn it_can_fetch_and_log_repositories_async_mode() {
        let mut fetcher = MockRepoFetcher::new();
        let mut logger = MockRepoLogger::new();

        let filter = repository::Filter {
            owner: Some(String::from("onlydust")),
            name: Some(String::from("starkonquest")),
        };

        let repo = repository::Repository {
            id: String::from("42"),
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let repositories = vec![repo.clone()];

        fetcher
            .expect_fetch_async()
            .with(eq(filter.clone()))
            .times(1)
            .return_once(|_| Ok(repositories));

        logger
            .expect_log_async()
            .with(eq(repo.clone()))
            .times(1)
            .returning(|_| Ok(()));

        fetch_and_log(
            Fetcher::Async(Arc::new(fetcher)),
            Logger::Async(Arc::new(logger)),
            filter,
        )
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn it_can_fetch_and_log_pullrequests() {
        let mut fetcher = MockPRFetcher::new();
        let mut logger = MockPRLogger::new();

        let repo = repository::Repository {
            id: String::from("42"),
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let filter = pullrequest::Filter {
            author: None,
            repository: Some(repo.clone()),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
            repository_id: repo.id.clone(),
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
            repository_id: repo.id.clone(),
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        fetcher
            .expect_fetch_async()
            .with(eq(filter.clone()))
            .times(1)
            .return_once(|_| Ok(prs));

        logger
            .expect_log_async()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Ok(()));

        logger
            .expect_log_async()
            .with(eq(pr2.clone()))
            .times(1)
            .returning(|_| Ok(()));

        fetch_and_log(
            Fetcher::Async(Arc::new(fetcher)),
            Logger::Async(Arc::new(logger)),
            filter,
        )
        .await
        .unwrap();
    }

    #[tokio::test]
    async fn it_stops_if_fetching_fails() {
        let mut fetcher = MockRepoFetcher::new();
        let logger = MockRepoLogger::new();

        let filter = repository::Filter {
            owner: None,
            name: None,
        };

        fetcher
            .expect_fetch_async()
            .with(eq(filter.clone()))
            .times(1)
            .return_once(|_| Err(anyhow!("Repository does not exists")));

        assert_eq!(
            "Repository does not exists",
            fetch_and_log(
                Fetcher::Async(Arc::new(fetcher)),
                Logger::Async(Arc::new(logger)),
                filter,
            )
            .await
            .unwrap_err()
            .to_string()
        );
    }

    #[tokio::test]
    async fn it_returns_error_if_logging_fails() {
        let mut fetcher = MockPRFetcher::new();
        let mut logger = MockPRLogger::new();

        let repo = repository::Repository {
            id: String::from("42"),
            owner: String::from("onlydust"),
            name: String::from("starkonquest"),
        };

        let filter = pullrequest::Filter {
            author: None,
            repository: Some(repo.clone()),
        };

        let pr1 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("123"),
            status: pullrequest::Status::Merged,
            repository_id: repo.id.clone(),
        };

        let pr2 = pullrequest::PullRequest {
            author: String::from("me"),
            id: String::from("456"),
            status: pullrequest::Status::Merged,
            repository_id: repo.id.clone(),
        };

        let prs = vec![pr1.clone(), pr2.clone()];

        fetcher
            .expect_fetch_async()
            .with(eq(filter.clone()))
            .times(1)
            .return_once(|_| Ok(prs));

        logger
            .expect_log_async()
            .with(eq(pr1.clone()))
            .times(1)
            .returning(|_| Err(anyhow!("Unable to log PR#1")));

        assert_eq!(
            "Unable to log PR#1",
            fetch_and_log(
                Fetcher::Async(Arc::new(fetcher)),
                Logger::Async(Arc::new(logger)),
                filter,
            )
            .await
            .unwrap_err()
            .to_string()
        );
    }
}
