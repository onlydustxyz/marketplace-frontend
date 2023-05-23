/// Implements the `GithubSearchUserService` trait for a `github::Client`.
///
/// This trait provides a method called `users` which allows searching for Github users based on a query.
/// The `users` method returns a `GithubServiceResult` containing a vector of `GithubUser` objects that match the query.
///
/// # Examples
///
/// ```
/// use my_github_api::github::{self, Client};
/// use my_github_api::domain::GithubSearchUserService;
///
/// let client = Client::new("my_token");
/// let query = "rust language";
///
/// match client.users(query, None, None, None, None).await {
///     Ok(users) => println!("{:?}", users),
///     Err(error) => eprintln!("Error: {}", error),
/// }
/// ```
///
/// All parameters are optional. If `sort`, `order`, `per_page`, or `page` are not specified, the defaults
/// based on the Github API will be used.
#[async_trait]
impl GithubSearchUserService for github::Client {
    #[instrument(skip(self))]
    async fn users(
        &self,
        query: &str,
        sort: Option<String>,
        order: Option<String>,
        per_page: Option<u8>,
        page: Option<u32>,
    ) -> GithubServiceResult<Vec<GithubUser>> {
        let users = self
            .search_users(query, sort, order, per_page, page)
            .await
            .map_err(Into::<GithubServiceError>::into)?
            .into_iter()
            .map(GithubUser::from_octocrab_user)
            .collect();
        Ok(users)
    }
}