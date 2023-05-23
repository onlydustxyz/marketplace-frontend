/// This module provides a trait and its implementation for converting roles to permissions.
mod role_to_permission {

    // Import required modules.
    use domain::{AggregateRootRepository, Project};
    use presentation::http::guards::Role;
    use crate::domain::{
        permissions::{self, IntoPermission},
        Permissions,
    };

    /// Implements the conversion of a `Role` instance to permissions.
    impl IntoPermission for Role {
       
        /// Converts a given `Role` instance to a `Box<dyn Permissions>`.
        ///
        /// Parameters:
        /// - `self`: the `Role` instance to convert.
        /// - `project_repository`: repository used to retrieve project data.
        ///
        /// Returns a `Box<dyn Permissions>` representing the permissions that the `Role` instance grants.
        fn to_permissions(
            &self,
            project_repository: AggregateRootRepository<Project>,
        ) -> Box<dyn Permissions> {
            match self {
                // If the role is Admin, return the permissions of the admin.
                Role::Admin => permissions::of_admin(),

                // If the role is a Registered User, return the permissions of the identified user.
                Role::RegisteredUser {
                    lead_projects,
                    github_user_id,
                } => permissions::of_identified_user(
                    lead_projects.iter().map(|id| (*id).into()).collect(),
                    *github_user_id,
                    project_repository,
                ),

                // If the role is Public, return the permissions of the anonymous user.
                Role::Public => permissions::of_anonymous(),
            }
        }
    }
}