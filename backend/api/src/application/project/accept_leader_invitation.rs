/// Provides a use case to accept a leader invitation for a project
/// 
/// `Usecase` is implemented for accepting a leader invitation for a project, this use case will allow a user to accept a leader invitation 
/// for a project only if the github user id specified in the invitation matches with the provided `GithubUserId`. 
/// This method assigns the provided `UserId` as the leader of the project, deletes the invitation from the database, 
/// and publishes an event to notify the system about the change in leadership of the project.
/// 
/// # Fields
/// * `event_publisher` - An `Arc` reference to an object that implements `Publisher<UniqueMessage<Event>>`
/// * `invitations_repository` - An object implementing `PendingProjectLeaderInvitationsRepository` trait that provides a way to interact with the pending project leader invitations repository
/// * `project_repository` - An object implementing `AggregateRootRepository<Project>` trait that provides a way to interact with the project repository
/// 
/// # Examples
/// ```
/// use std::sync::Arc;
/// use anyhow::Result;
/// use domain::{AggregateRootRepository, DomainError, Event, GithubUserId, Project, Publisher, UserId};
/// use infrastructure::amqp::UniqueMessage;
/// use tracing::{instrument, info};
/// use crate::{domain::{PendingProjectLeaderInvitationId, Publishable}, infrastructure::database::PendingProjectLeaderInvitationsRepository, usecases::accept_leader_invitation::Usecase};
///
/// #[derive(Default)]
/// struct MockPublisher;
/// 
/// #[async_trait::async_trait]
/// impl Publisher<UniqueMessage<Event>> for MockPublisher {
///     async fn publish(&self, message: UniqueMessage<Event>) -> Result<()> {
///         info!("Published event: {:?}", message.message());
///         Ok(())
///     }
/// }
///
/// #[tokio::test]
/// async fn should_accept_leader_invitation() -> Result<()> {
///     let publisher = Arc::new(MockPublisher::default());
///     let invitations_repository = PendingProjectLeaderInvitationsRepository::new().unwrap();
///     let project_repository = AggregateRootRepository::new().unwrap();
///
///     let usecase = Usecase::new(publisher, invitations_repository, project_repository);
///     let invitation_id = PendingProjectLeaderInvitationId::new();
///     let user_id = UserId::new();
///     let github_user_id = GithubUserId::new();
///
///     let result = usecase.accept_leader_invitation(&invitation_id, &user_id, &github_user_id).await;
///
///     assert!(result.is_err());
///     assert_eq!(result.unwrap_err().to_string(), "Invitation does not exist");
///
///     Ok(())
/// }
/// ```
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	invitations_repository: PendingProjectLeaderInvitationsRepository,
	project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
	/// Creates a new `Usecase` object
	/// 
	/// # Arguments
	/// * `event_publisher` - An `Arc` reference to an object that implements `Publisher<UniqueMessage<Event>>`
	/// * `invitations_repository` - An object implementing `PendingProjectLeaderInvitationsRepository` trait that provides a way to interact with the pending project leader invitations repository
	/// * `project_repository` - An object implementing `AggregateRootRepository<Project>` trait that provides a way to interact with the project repository
	/// 
	/// # Returns
	/// A new `Usecase` object
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		invitations_repository: PendingProjectLeaderInvitationsRepository,
		project_repository: AggregateRootRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			invitations_repository,
			project_repository,
		}
	}

	/// Accepts a leader invitation for a project
	/// 
	/// # Arguments
	/// * `invitation_id` - A reference to a `PendingProjectLeaderInvitationId` object that represents the id of the invitation to accept
	/// * `user_id` - A reference to a `UserId` object that represents the user id of the user who is accepting the invitation
	/// * `github_user_id` - A reference to a `GithubUserId` object that represents the github user id of the user who is accepting the invitation
	/// 
	/// # Returns
	/// `Ok(())` if the invitation is accepted successfully, `DomainError` otherwise
	pub async fn accept_leader_invitation(
		&self,
		invitation_id: &PendingProjectLeaderInvitationId,
		user_id: &UserId,
		github_user_id: &GithubUserId,
	) -> Result<(), DomainError> {
		let invitation = self.invitations_repository.find_by_id(invitation_id)?;
		if github_user_id != invitation.github_user_id() {
			return Err(DomainError::InvalidInputs(anyhow!(
				"GithubUserId {github_user_id} does not match the invitation {invitation_id}"
			)));
		}

		let project = self.project_repository.find_by_id(invitation.project_id())?;

		project
			.assign_leader(*user_id)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.invitations_repository.delete(invitation_id)?;
		Ok(())
	}
}