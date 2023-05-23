/// Provides methods to fetch github user's information
///
/// # Examples
///
/// ```
/// use my_crate::github::Client;
/// use domain::{GithubFetchUserService, GithubServiceResult, GithubUserId, GithubUser};
/// let client = Client::new();
/// let user_id = GithubUserId::new(123456);
/// let user = client.user_by_id(&user_id).await?;
/// assert_eq!(user.id(), &user_id);
///
/// let current_user = client.current_user().await?;
/// let current_user_name = current_user.login();
/// ```
use async_trait::async_trait;
use domain::{GithubFetchUserService, GithubServiceResult, GithubUser, GithubUserId};
use olog::tracing::instrument;

use crate::github::{self, user::UserFromOctocrab};

#[async_trait]
impl GithubFetchUserService for github::Client {
    /// Fetches the github user's information by it's ID
    ///
    /// # Arguments
    ///
    /// * `id` - A reference to a `GithubUserId` that represents the ID of the user
    ///
    /// # Examples
    ///
    /// ```
    /// use my_crate::github::Client;
    /// use domain::{GithubFetchUserService, GithubServiceResult, GithubUserId, GithubUser};
    /// let client = Client::new();
    /// let user_id = GithubUserId::new(123456);
    /// let user = client.user_by_id(&user_id).await?;
    /// assert_eq!(user.id(), &user_id);
    /// ```
    #[instrument(skip(self))]
    async fn user_by_id(&self, id: &GithubUserId) -> GithubServiceResult<GithubUser> {
        let user = self.get_user_by_id(id).await?;
        Ok(GithubUser::from_octocrab_user(user))
    }

    /// Fetches the current github user's information
    ///
    /// # Examples
    ///
    /// ```
    /// use my_crate::github::Client;
    /// use domain::{GithubFetchUserService, GithubServiceResult, GithubUser};
    /// let client = Client::new();
    /// let current_user = client.current_user().await?;
    /// let current_user_name = current_user.login();
    /// ```
    #[instrument(skip(self))]
    async fn current_user(&self) -> GithubServiceResult<GithubUser> {
        let user = self.get_current_user().await?;
        Ok(GithubUser::from_octocrab_user(user))
    }
}