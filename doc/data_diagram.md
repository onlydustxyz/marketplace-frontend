# Data diagram

```mermaid
classDiagram

class Applications {
   applicantId: uuid!
   id: uuid!
   projectId: uuid!
   receivedAt: timestamp!
}

class AuthUserGithubProvider {
   accessToken: String
   createdAt: timestamptz
   githubUserId: bigint
   id: uuid
   providerId: String
   providerUserId: String
   refreshToken: String
   updatedAt: timestamptz
   userId: uuid
}

class Budgets {
   id: uuid!
   initialAmount: numeric!
   paymentRequests: [PaymentRequests!]!
   project: Projects
   projectId: uuid
   remainingAmount: numeric!
   spentAmount: numeric!
}

class Commands {
   createdAt: timestamp
   id: uuid
   processingCount: Int
   projectId: uuid
   updatedAt: timestamp
}

class ContactInformations {
   channel: contact_channel
   contact: String
   githubUserId: bigint
   public: Boolean
}

class ContributionCounts {
   githubUserId: bigint
   paidCount: bigint
   unpaidCount: bigint
   week: float8
   year: float8
}

class ContributionStats {
   githubUserId: bigint
   maxDate: timestamp
   minDate: timestamp
   paidCount: bigint
   projectId: uuid
   totalCount: bigint
   unpaidCount: bigint
   unpaidUnignoredCount: bigint
}

class Contributions {
   createdAt: timestamp
   githubIssueId: bigint
   githubUserId: bigint
   ignored: Boolean
   issueNumber: bigint
   projectId: uuid
   repoId: bigint
}

class GithubIssues {
   authorId: bigint!
   closedAt: timestamp
   createdAt: timestamp!
   htmlUrl: String!
   id: bigint!
   ignoredForProjects: [IgnoredGithubIssues!]!
   issueNumber: bigint!
   mergedAt: timestamp
   repoId: bigint!
   status: github_issue_status!
   title: String!
   type: github_issue_type!
}

class GithubRepos {
   description: String!
   forkCount: Int!
   htmlUrl: String!
   id: bigint!
   languages: jsonb!
   name: String!
   owner: String!
   stars: Int!
   updatedAt: timestamp
}

class GithubReposContributors {
   repoId: bigint!
   user: GithubUsers
   userId: bigint!
}

class GithubUsers {
   avatarUrl: String!
   bio: String
   htmlUrl: String!
   id: bigint!
   linkedin: String
   location: String
   login: String!
   paymentRequests: [PaymentRequests!]!
   telegram: String
   twitter: String
   user: RegisteredUsers
   website: String
}

class IgnoredGithubIssues {
   issueNumber: bigint!
   projectId: uuid!
   repoId: bigint!
}

class Issue {
   author: User!
   closedAt: DateTimeUtc
   createdAt: DateTimeUtc!
   htmlUrl: Url!
   id: GithubIssueId!
   ignoredForProjects: [IgnoredGithubIssues!]!
   mergedAt: DateTimeUtc
   number: GithubIssueNumber!
   repoId: GithubRepoId!
   status: Status!
   title: String!
   type: Type!
   updatedAt: DateTimeUtc!
}

class Payment {
   amount: Amount!
   budgetId: Id!
   commandId: Id!
   paymentId: Id!
   projectId: Id!
}

class PaymentRequests {
   amountInUsd: bigint!
   budget: Budgets
   budgetId: uuid!
   githubRecipient: GithubUsers
   hoursWorked: Int!
   id: uuid!
   invoiceReceivedAt: timestamp
   liveGithubRecipient: User
   payments: [Payments!]!
   recipient: RegisteredUsers
   recipientId: bigint!
   requestedAt: timestamp!
   requestor: RegisteredUsers
   requestorId: uuid!
   workItems: [WorkItems!]!
}

class PaymentStats {
   githubUserId: bigint
   moneyGranted: numeric
   projectId: uuid
}

class Payments {
   amount: numeric!
   currencyCode: String!
   id: uuid!
   paymentRequest: PaymentRequests
   processedAt: timestamp!
   receipt: jsonb!
   requestId: uuid!
}

class PendingProjectLeaderInvitations {
   githubUserId: bigint!
   id: uuid!
   project: Projects
   projectId: uuid!
   user: RegisteredUsers
}

class ProjectDetails {
   hiring: Boolean!
   logoUrl: String
   longDescription: String!
   name: String!
   projectId: uuid!
   rank: Int!
   shortDescription: String!
   telegramLink: String
   visibility: project_visibility!
}

class ProjectGithubRepos {
   githubRepoId: bigint!
   project: Projects
   projectId: uuid!
   repo: GithubRepos
   repoContributors: [GithubReposContributors!]!
   repoIssues: [GithubIssues!]!
}

class ProjectLeads {
   assignedAt: timestamp!
   project: Projects
   projectId: uuid!
   user: RegisteredUsers
   userId: uuid!
}

class Projects {
   applications: [Applications!]!
   budgets: [Budgets!]!
   contributors: [ProjectsContributorsView!]!
   githubRepos: [ProjectGithubRepos!]!
   id: uuid!
   pendingInvitations: [PendingProjectLeaderInvitations!]!
   projectDetails: ProjectDetails
   projectLeads: [ProjectLeads!]!
   projectSponsors: [ProjectsSponsors!]!
}

class ProjectsContributorsView {
   githubUser: GithubUsers
   githubUserId: bigint
   project: Projects
   projectId: uuid
   user: UserProfiles
}

class ProjectsSponsors {
   project: Projects!
   projectId: uuid!
   sponsor: Sponsors!
   sponsorId: uuid!
}

class RegisteredUsers {
   avatarUrl: String
   email: citext
   githubUserId: bigint
   htmlUrl: String
   id: uuid
   lastSeen: timestamptz
   login: String
   paymentRequests: [PaymentRequests!]!
   projectsLeaded: [ProjectLeads!]!
   userPayoutInfo: UserPayoutInfo
}

class Sponsors {
   id: uuid!
   logoUrl: String!
   name: String!
   sponsorProjects: [ProjectsSponsors!]!
   url: String
}

class User {
   avatarUrl: Url!
   htmlUrl: Url!
   id: GithubUserId!
   login: String!
   paymentRequests: [PaymentRequests!]!
   user: RegisteredUsers
}

class UserPayoutInfo {
   arePayoutSettingsValid: Boolean!
   identity: jsonb
   location: jsonb
   payoutSettings: jsonb
   userId: uuid!
}

class UserProfiles {
   avatarUrl: String
   bio: String
   contactInformations: [ContactInformations!]!
   contributionCounts: [ContributionCounts!]!
   contributionStats: [ContributionStats!]!
   contributions: [Contributions!]!
   createdAt: timestamptz
   githubUserId: bigint
   htmlUrl: String
   languages: jsonb
   lastSeen: timestamptz
   location: String
   login: String
   lookingForAJob: Boolean
   paymentStats: [PaymentStats!]!
   projectsContributed: [ProjectsContributorsView!]!
   projectsLeaded: [ProjectLeads!]!
   userId: uuid
   website: String
   weeklyAllocatedTime: allocated_time
}

class WorkItems {
   githubIssue: Issue
   ignoredForProjects: [IgnoredGithubIssues!]!
   issueNumber: bigint!
   paymentId: uuid!
   paymentRequest: PaymentRequests
   repoId: bigint!
}

class authProviderRequests {
   id: uuid!
   options: jsonb
}

class authProviders {
   id: String!
   userProviders: [authUserProviders!]!
}

class authRefreshTokens {
   createdAt: timestamptz!
   expiresAt: timestamptz!
   refreshToken: uuid!
   refreshTokenHash: String
   user: users!
   userId: uuid!
}

class authRoles {
   role: String!
   userRoles: [authUserRoles!]!
   usersByDefaultRole: [users!]!
}

class authUserProviders {
   accessToken: String!
   createdAt: timestamptz!
   id: uuid!
   provider: authProviders!
   providerId: String!
   providerUserId: String!
   refreshToken: String
   updatedAt: timestamptz!
   user: users!
   userId: uuid!
}

class authUserRoles {
   createdAt: timestamptz!
   id: uuid!
   role: String!
   roleByRole: authRoles!
   user: users!
   userId: uuid!
}

class authUserSecurityKeys {
   counter: bigint!
   credentialId: String!
   credentialPublicKey: bytea
   id: uuid!
   nickname: String
   transports: String!
   user: users!
   userId: uuid!
}

class users {
   activeMfaType: String
   avatarUrl: String!
   createdAt: timestamptz!
   currentChallenge: String
   defaultRole: String!
   defaultRoleByRole: authRoles!
   disabled: Boolean!
   displayName: String!
   email: citext
   emailVerified: Boolean!
   id: uuid!
   isAnonymous: Boolean!
   lastSeen: timestamptz
   locale: String!
   metadata: jsonb
   newEmail: citext
   otpHash: String
   otpHashExpiresAt: timestamptz!
   otpMethodLastUsed: String
   passwordHash: String
   phoneNumber: String
   phoneNumberVerified: Boolean!
   refreshTokens: [authRefreshTokens!]!
   registeredUser: RegisteredUsers
   roles: [authUserRoles!]!
   securityKeys: [authUserSecurityKeys!]!
   ticket: String
   ticketExpiresAt: timestamptz!
   totpSecret: String
   updatedAt: timestamptz!
   userGithubProvider: AuthUserGithubProvider
   userProviders: [authUserProviders!]!
}

Budgets -- Projects
Budgets --* PaymentRequests
GithubIssues --* IgnoredGithubIssues
GithubReposContributors -- GithubUsers
GithubUsers -- RegisteredUsers
GithubUsers --* PaymentRequests
Issue -- User
Issue --* IgnoredGithubIssues
PaymentRequests -- Budgets
PaymentRequests -- GithubUsers
PaymentRequests -- RegisteredUsers
PaymentRequests -- User
PaymentRequests --* Payments
PaymentRequests --* WorkItems
Payments -- PaymentRequests
PendingProjectLeaderInvitations -- Projects
PendingProjectLeaderInvitations -- RegisteredUsers
ProjectGithubRepos -- GithubRepos
ProjectGithubRepos -- Projects
ProjectGithubRepos --* GithubIssues
ProjectGithubRepos --* GithubReposContributors
ProjectLeads -- Projects
ProjectLeads -- RegisteredUsers
Projects -- ProjectDetails
Projects --* Applications
Projects --* Budgets
Projects --* PendingProjectLeaderInvitations
Projects --* ProjectGithubRepos
Projects --* ProjectLeads
Projects --* ProjectsContributorsView
Projects --* ProjectsSponsors
ProjectsContributorsView -- GithubUsers
ProjectsContributorsView -- Projects
ProjectsContributorsView -- UserProfiles
ProjectsSponsors -- Projects
ProjectsSponsors -- Sponsors
RegisteredUsers -- UserPayoutInfo
RegisteredUsers --* PaymentRequests
RegisteredUsers --* ProjectLeads
Sponsors --* ProjectsSponsors
User -- RegisteredUsers
User --* PaymentRequests
UserProfiles --* ContactInformations
UserProfiles --* ContributionCounts
UserProfiles --* ContributionStats
UserProfiles --* Contributions
UserProfiles --* PaymentStats
UserProfiles --* ProjectLeads
UserProfiles --* ProjectsContributorsView
WorkItems -- Issue
WorkItems -- PaymentRequests
WorkItems --* IgnoredGithubIssues
authProviders --* authUserProviders
authRefreshTokens -- users
authRoles --* authUserRoles
authRoles --* users
authUserProviders -- authProviders
authUserProviders -- users
authUserRoles -- authRoles
authUserRoles -- users
authUserSecurityKeys -- users
users -- AuthUserGithubProvider
users -- RegisteredUsers
users -- authRoles
users --* authRefreshTokens
users --* authUserProviders
users --* authUserRoles
users --* authUserSecurityKeys
```
