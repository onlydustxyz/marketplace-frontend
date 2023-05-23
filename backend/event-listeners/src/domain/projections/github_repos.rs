/// This module contains database schema for GithubRepo.
use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use domain::GithubRepoId;
use serde::{Deserialize, Serialize};

/// A struct representing a Github repository.
#[allow(clippy::too_many_arguments)]
#[derive(
    Default, Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable,
)]
#[table_name = "github_repos"]
#[primary_key(id)]
pub struct GithubRepo {
    /// The unique identifier for the repository.
    pub id: GithubRepoId,
    /// The owner of the repository.
    pub owner: String,
    /// The name of the repository.
    pub name: String,
    /// The date and time when the repository was last updated.
    pub updated_at: Option<NaiveDateTime>,
    /// The description of the repository.
    pub description: String,
    /// The number of stars the repository has.
    pub stars: i32,
    /// The number of forks the repository has.
    pub fork_count: i32,
    /// The HTML URL of the repository.
    pub html_url: String,
    /// The programming languages used in the repository.
    pub languages: serde_json::Value,
}

impl domain::Entity for GithubRepo {
    /// The type of ID used by a GithubRepo.
    type Id = GithubRepoId;
}