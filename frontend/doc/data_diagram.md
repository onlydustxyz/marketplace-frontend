# Data diagram

```mermaid
classDiagram

class ApiCompletedContributions {
   closedAt: timestamp
   createdAt: timestamp
   detailsId: String
   githubUserId: bigint
   id: String
   projectId: uuid
   repoId: bigint
   rewardItems: [WorkItems!]!
   status: contribution_status
   type: contribution_type
}

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

class Contacts {
   discord: ContactInformations
   email: ContactInformations
   linkedin: ContactInformations
   telegram: ContactInformations
   twitter: ContactInformations
   whatsapp: ContactInformations
}

class ContributionCounts {
   codeReviewCount: bigint
   githubUserId: bigint
   issueCount: bigint
   pullRequestCount: bigint
   week: float8
   year: float8
}

class ContributionStats {
   codeReviewCount: bigint
   githubUserId: bigint
   issueCount: bigint
   maxDate: timestamp
   minDate: timestamp
   projectId: uuid
   pullRequestCount: bigint
   totalCount: bigint
}

class Contributions {
   closedAt: timestamp
   createdAt: timestamp
   detailsId: String
   githubCodeReviewId: String
   githubIssue: GithubIssues
   githubIssueId: bigint
   githubPullRequest: GithubPullRequests
   githubPullRequestId: bigint
   githubUserId: bigint
   id: String
   ignored: Boolean
   projectId: uuid
   repoId: bigint
   rewardItems: [WorkItems!]!
   status: contribution_status
   type: String
}

class GithubIssue {
   author: GithubUser!
   closedAt: DateTimeUtc
   commentsCount: Int!
   createdAt: DateTimeUtc!
   htmlUrl: Url!
   id: Int!
   number: Int!
   repoId: Int!
   status: GithubIssueStatus!
   title: String!
   updatedAt: DateTimeUtc!
}

class GithubIssues {
   assigneeIds: jsonb
   authorId: bigint
   closedAt: timestamp
   commentsCount: bigint
   createdAt: timestamp
   htmlUrl: String
   id: bigint
   number: bigint
   repo: GithubRepos
   repoId: bigint
   status: String
   title: String
}

class GithubPullRequest {
   author: GithubUser!
   closedAt: DateTimeUtc
   createdAt: DateTimeUtc!
   htmlUrl: Url!
   id: Int!
   mergedAt: DateTimeUtc
   number: Int!
   repoId: Int!
   status: GithubPullRequestStatus!
   title: String!
   updatedAt: DateTimeUtc!
}

class GithubPullRequestReviews {
   id: String
   outcome: github_code_review_outcome
   pullRequestId: bigint
   reviewerId: bigint
   status: String
   submittedAt: timestamp
}

class GithubPullRequests {
   authorId: bigint
   ciChecks: github_ci_checks
   closedAt: timestamp
   closingIssueNumbers: jsonb
   createdAt: timestamp
   draft: Boolean
   htmlUrl: String
   id: bigint
   mergedAt: timestamp
   number: bigint
   repo: GithubRepos
   repoId: bigint
   status: String
   title: String
}

class GithubRepos {
   description: String
   forkCount: Int
   hasIssues: Boolean
   htmlUrl: String
   id: bigint
   indexedAt: timestamp
   languages: jsonb
   name: String
   owner: String
   parentId: bigint
   projects: [ProjectGithubRepos!]!
   stars: Int
   updatedAt: timestamp
}

class GithubUser {
   avatarUrl: Url!
   htmlUrl: Url!
   id: Int!
   login: String!
   user: RegisteredUsers
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

class Onboardings {
   profileWizardDisplayDate: timestamp
   termsAndConditionsAcceptanceDate: timestamp
   userId: uuid!
}

class Payment {
   amount: Amount!
   budgetId: Uuid!
   commandId: Uuid!
   paymentId: Uuid!
   projectId: Uuid!
}

class PaymentRequests {
   amountInUsd: bigint!
   budget: Budgets
   budgetId: uuid!
   githubRecipient: GithubUsers
   hoursWorked: Int!
   id: uuid!
   invoiceReceivedAt: timestamp
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

class ProjectGithubRepos {
   githubRepoId: bigint!
   projectId: uuid!
   repo: GithubRepos
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
   contributors: [ProjectsContributors!]!
   githubRepos: [ProjectGithubRepos!]!
   hiring: Boolean
   id: uuid
   key: String
   logoUrl: String
   longDescription: String
   moreInfoLink: String
   name: String
   pendingContributors: [ProjectsPendingContributors!]!
   pendingInvitations: [PendingProjectLeaderInvitations!]!
   projectLeads: [ProjectLeads!]!
   rank: Int
   rewardedUsers: [ProjectsRewardedUsers!]!
   shortDescription: String
   sponsors: [ProjectsSponsors!]!
   visibility: project_visibility
}

class ProjectsContributors {
   githubUser: GithubUsers
   githubUserId: bigint!
   project: Projects
   projectId: uuid!
   user: UserProfiles
}

class ProjectsPendingContributors {
   githubUserId: bigint!
   projectId: uuid!
}

class ProjectsRewardedUsers {
   githubUserId: bigint!
   projectId: uuid!
   rewardCount: Int!
}

class ProjectsSponsors {
   projectId: uuid!
   sponsor: Sponsors!
   sponsorId: uuid!
}

class RegisteredUsers {
   admin: Boolean
   avatarUrl: String
   email: citext
   githubUserId: bigint
   htmlUrl: String
   id: uuid
   lastSeen: timestamp
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

class Technologies {
   technology: String
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
   completedContributions: [ApiCompletedContributions!]!
   completionScore: Int!
   contactInformations: [ContactInformations!]!
   contacts: Contacts!
   contributionCounts: [ContributionCounts!]!
   contributionStats: [ContributionStats!]!
   contributions: [Contributions!]!
   cover: profile_cover
   createdAt: timestamp
   githubUserId: bigint
   htmlUrl: String
   languages: jsonb
   lastSeen: timestamp
   location: String
   login: String
   lookingForAJob: Boolean
   paymentStats: [PaymentStats!]!
   projectsContributed: [ProjectsContributors!]!
   projectsLeaded: [ProjectLeads!]!
   projectsRewarded: [ProjectsRewardedUsers!]!
   userId: uuid
   website: String
   weeklyAllocatedTime: allocated_time
}

class WorkItems {
   githubCodeReview: GithubPullRequestReviews
   githubCodeReviewId: String
   githubIssue: GithubIssues
   githubIssueId: bigint
   githubPullRequest: GithubPullRequests
   githubPullRequestId: bigint
   id: String
   number: bigint
   paymentId: uuid
   paymentRequest: PaymentRequests
   projectId: uuid
   recipientId: bigint
   repoId: bigint
   type: contribution_type
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

ApiCompletedContributions --* WorkItems
Budgets -- Projects
Budgets --* PaymentRequests
Contacts -- ContactInformations
Contributions -- GithubIssues
Contributions -- GithubPullRequests
Contributions --* WorkItems
GithubIssue -- GithubUser
GithubIssues -- GithubRepos
GithubPullRequest -- GithubUser
GithubPullRequests -- GithubRepos
GithubRepos --* ProjectGithubRepos
GithubUser -- RegisteredUsers
GithubUsers -- RegisteredUsers
GithubUsers --* PaymentRequests
PaymentRequests -- Budgets
PaymentRequests -- GithubUsers
PaymentRequests -- RegisteredUsers
PaymentRequests --* Payments
PaymentRequests --* WorkItems
Payments -- PaymentRequests
PendingProjectLeaderInvitations -- Projects
PendingProjectLeaderInvitations -- RegisteredUsers
ProjectGithubRepos -- GithubRepos
ProjectGithubRepos --* GithubIssues
ProjectLeads -- Projects
ProjectLeads -- RegisteredUsers
Projects --* Applications
Projects --* Budgets
Projects --* PendingProjectLeaderInvitations
Projects --* ProjectGithubRepos
Projects --* ProjectLeads
Projects --* ProjectsContributors
Projects --* ProjectsPendingContributors
Projects --* ProjectsRewardedUsers
Projects --* ProjectsSponsors
ProjectsContributors -- GithubUsers
ProjectsContributors -- Projects
ProjectsContributors -- UserProfiles
ProjectsSponsors -- Sponsors
RegisteredUsers -- UserPayoutInfo
RegisteredUsers --* PaymentRequests
RegisteredUsers --* ProjectLeads
Sponsors --* ProjectsSponsors
UserProfiles -- Contacts
UserProfiles --* ApiCompletedContributions
UserProfiles --* ContactInformations
UserProfiles --* ContributionCounts
UserProfiles --* ContributionStats
UserProfiles --* Contributions
UserProfiles --* PaymentStats
UserProfiles --* ProjectLeads
UserProfiles --* ProjectsContributors
UserProfiles --* ProjectsRewardedUsers
WorkItems -- GithubIssues
WorkItems -- GithubPullRequestReviews
WorkItems -- GithubPullRequests
WorkItems -- PaymentRequests
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
