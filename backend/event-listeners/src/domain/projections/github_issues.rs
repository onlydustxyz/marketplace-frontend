/// This module contains the definition of the `GithubIssue` struct which is used to represent
/// a GitHub issue in the database.
///
/// It depends on the `infrastructure::database::schema` module for accessing the database schema.
///
/// The `GithubIssue` struct implements the `Entity` trait from the `domain` module and is used
/// to interact with the domain layer of the application.
use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use domain::{
    GithubIssueId, GithubIssueNumber, GithubIssueStatus, GithubIssueType, GithubRepoId,
    GithubUserId, Entity,
};
use serde::{Deserialize, Serialize};

/// This struct is used to represent a GitHub issue in the database.
///
/// It is implemented as an `Insertable` and `AsChangeset` and can be serialized and deserialized
/// using the `Serialize` and `Deserialize` traits.
#[derive(Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize)]
pub struct GithubIssue {
    /// The id of the issue.
    pub id: GithubIssueId,
    /// The id of the repository that the issue belongs to.
    pub repo_id: GithubRepoId,
    /// The issue number.
    pub issue_number: GithubIssueNumber,
    /// The time the issue was created.
    pub created_at: NaiveDateTime,
    /// The id of the author of the issue.
    pub author_id: GithubUserId,
    /// The time the issue was merged (if it was merged).
    pub merged_at: Option<NaiveDateTime>,
    /// The type of the issue (i.e. bug, feature request, etc).
    pub type_: GithubIssueType,
    /// The status of the issue (i.e. open, closed, etc).
    pub status: GithubIssueStatus,
    /// The title of the issue.
    pub title: String,
    /// The URL of the issue on GitHub.
    pub html_url: String,
    /// The time the issue was closed (if it was closed).
    pub closed_at: Option<NaiveDateTime>,
}

impl Entity for GithubIssue {
    /// The id of the `GithubIssue` is of type `GithubIssueId`.
    type Id = GithubIssueId;
}