/// Provides a data structure to generate query parameters used for fetching pull requests from Github.
/// 
/// ## Example
/// 
/// ```
/// use octocrab::params::{pulls::Sort, Direction};
/// use github_service_filters::IssueState;
/// use crate::QueryParams;
/// 
/// let query_params = QueryParams::default()
///     .direction(Direction::Descending)
///     .sort(Sort::Updated)
///     .state(IssueState::All);
/// ```
#[derive(Debug, Default, Clone, Copy, Serialize)]
#[serde(rename_all = "snake_case")]
pub struct QueryParams {
    direction: Option<Direction>,
    page: Option<u8>,
    per_page: Option<u8>,
    sort: Option<Sort>,
    state: Option<State>,
}

impl QueryParams {
    /// Sets the direction of the sort order for the pull requests.
    pub fn direction(self, direction: Direction) -> Self {
        Self {
            direction: Some(direction),
            ..self
        }
    }

    /// Sets the page number for the results.
    pub fn page(self, page: u8) -> Self {
        Self {
            page: Some(page),
            ..self
        }
    }

    /// Sets the number of results to show per page.
    pub fn per_page(self, per_page: u8) -> Self {
        Self {
            per_page: Some(per_page),
            ..self
        }
    }

    /// Sets the field to sort by.
    pub fn sort(self, sort: Sort) -> Self {
        Self {
            sort: Some(sort),
            ..self
        }
    }

    /// Sets the state of the pull requests to fetch.
    pub fn state(self, state: State) -> Self {
        Self {
            state: Some(state),
            ..self
        }
    }

    /// Converts the query params into a query string to be used in the API request.
    pub fn to_query_string(self) -> Result<String, serde_qs::Error> {
        serde_qs::to_string(&self)
    }
}

#[derive(Debug, Clone, Copy, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum State {
    /// Fetches only the open pull requests.
    Open,

    /// Fetches only the closed pull requests.
    Closed,

    /// Fetches both open and closed pull requests.
    All,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn all_filters() {
        let query_params = QueryParams::default()
            .direction(Direction::Ascending)
            .page(2)
            .per_page(10)
            .sort(Sort::Updated)
            .state(State::Closed);

        assert_eq!(
            serde_qs::to_string(&query_params).unwrap(),
            "direction=asc&page=2&per_page=10&sort=updated&state=closed"
        );
    }

    #[test]
    fn no_filter() {
        let query_params: QueryParams = QueryParams::default();
        assert_eq!(serde_qs::to_string(&query_params).unwrap(), "");
    }
}