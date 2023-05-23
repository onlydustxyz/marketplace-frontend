use chrono::{DateTime, Utc};
use juniper::{GraphQLEnum, GraphQLInputObject};

use crate::{stream_filter, GithubIssue};

/// Represents filters to find GitHub issues matching certain criteria
#[derive(Debug, Default, Clone, Copy, GraphQLInputObject)]
pub struct IssueFilters {
    /// State of the issues to filter
    pub state: Option<IssueState>,
    /// Created since a certain datetime
    pub created_since: Option<DateTime<Utc>>,
    /// Updated since a certain datetime
    pub updated_since: Option<DateTime<Utc>>,
}

/// Represents possible states of a GitHub issue
#[derive(Debug, Clone, Copy, GraphQLEnum, PartialEq, Eq)]
pub enum IssueState {
    /// Open issue
    Open,
    /// Closed issue
    Closed,
    /// All issues
    All,
}

impl stream_filter::Filter for IssueFilters {
    type I = GithubIssue;

    /// Filters a stream of GitHub issues based on the specified filters
    ///
    /// # Arguments
    ///
    /// * `item` - An item in the stream, which is a GitHub issue
    ///
    /// # Returns
    ///
    /// A [`stream_filter::Decision`](crate::stream_filter::Decision) indicating
    /// whether to `Take` the item, `Skip` it, or `End` the stream.
    fn filter(&self, item: GithubIssue) -> stream_filter::Decision<GithubIssue> {
        if let Some(created_since) = self.created_since {
            if item.created_at < created_since {
                // Found a pr created before `created_since`,
                // assuming stream is ordered, we can end here
                return stream_filter::Decision::End;
            }
        }

        if let Some(updated_since) = self.updated_since {
            if item.updated_at < updated_since {
                // Found a pr updated before `updated_since`,
                // assuming stream is ordered, we can end here
                return stream_filter::Decision::End;
            }
        }

        stream_filter::Decision::Take(item)
    }
}

#[cfg(test)]
mod tests {
    // Tests omitted for brevity
}