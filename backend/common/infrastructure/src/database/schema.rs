/**
* Defines a set of tables used by the system.
* The tables include:
*   - budgets: contains budget information, such as the amount spent and remaining amount.
*   - event_deduplications: contains information about events that have already been processed, to avoid duplicates.
*   - events: contains information about events in the system, such as their timestamp and payload.
*   - github_issues: contains information about issues in GitHub repositories.
*   - github_repo_indexes: contains information about indexed GitHub repositories.
*   - github_repos: contains information about GitHub repositories.
*   - github_repos_contributors: contains information about contributors to GitHub repositories.
*   - github_user_indexes: contains information about indexed GitHub users.
*   - github_users: contains information about GitHub users.
*   - ignored_github_issues: contains information about GitHub issues that are ignored by the system.
*   - payment_requests: contains information about payment requests, such as the amount and requester.
*   - payments: contains information about payments made.
*   - pending_project_leader_invitations: contains information about pending invitations to become a project leader.
*   - project_details: contains information about project details, such as its description and logo.
*   - project_github_repos: contains information about project-related GitHub repositories.
*   - project_leads: contains information about project leaders.
*   - projects: contains information about projects.
*   - projects_sponsors: contains information about project sponsors.
*   - sponsors: contains information about sponsors.
*   - user_info: contains information about user profiles, such as their identity and location.
*   - work_items: contains information about work items, such as the payment and issue number.
*    
* @generated automatically by Diesel CLI.
*/

diesel::table! {
    budgets (id) {
        id -> Uuid,
        project_id -> Nullable<Uuid>,
        initial_amount -> Numeric,
        remaining_amount -> Numeric,
        spent_amount -> Numeric,
    }
}

diesel::table! {
    event_deduplications (deduplication_id) {
        deduplication_id -> Text,
        event_index -> Int4,
    }
}

diesel::table! {
    events (index) {
        index -> Int4,
        timestamp -> Timestamp,
        aggregate_name -> Varchar,
        aggregate_id -> Varchar,
        payload -> Jsonb,
        metadata -> Nullable<Jsonb>,
    }
}

diesel::table! {
    github_issues (id) {
        id -> Int8,
        repo_id -> Int8,
        issue_number -> Int8,
        created_at -> Timestamp,
        author_id -> Int8,
        merged_at -> Nullable<Timestamp>,
        #[sql_name = "type"]
        type_ -> Jsonb,
        status -> Jsonb,
        title -> Text,
        html_url -> Text,
        closed_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    github_repo_indexes (repo_id) {
        repo_id -> Int8,
        repo_indexer_state -> Nullable<Jsonb>,
        issues_indexer_state -> Nullable<Jsonb>,
    }
}

diesel::table! {
    github_repos (id) {
        id -> Int8,
        owner -> Text,
        name -> Text,
        updated_at -> Nullable<Timestamp>,
        description -> Text,
        stars -> Int4,
        fork_count -> Int4,
        html_url -> Text,
        languages -> Jsonb,
    }
}

diesel::table! {
    github_repos_contributors (repo_id, user_id) {
        repo_id -> Int8,
        user_id -> Int8,
    }
}

diesel::table! {
    github_user_indexes (user_id) {
        user_id -> Int8,
        user_indexer_state -> Nullable<Jsonb>,
    }
}

diesel::table! {
    github_users (id) {
        id -> Int8,
        login -> Text,
        avatar_url -> Text,
        html_url -> Text,
    }
}

diesel::table! {
    ignored_github_issues (project_id, repo_id, issue_number) {
        project_id -> Uuid,
        repo_id -> Int8,
        issue_number -> Int8,
    }
}

diesel::table! {
    payment_requests (id) {
        id -> Uuid,
        budget_id -> Uuid,
        requestor_id -> Uuid,
        recipient_id -> Int8,
        amount_in_usd -> Int8,
        requested_at -> Timestamp,
        invoice_received_at -> Nullable<Timestamp>,
        hours_worked -> Int4,
    }
}

diesel::table! {
    payments (id) {
        id -> Uuid,
        amount -> Numeric,
        currency_code -> Text,
        receipt -> Jsonb,
        request_id -> Uuid,
        processed_at -> Timestamp,
    }
}

diesel::table! {
    pending_project_leader_invitations (id) {
        id -> Uuid,
        project_id -> Uuid,
        github_user_id -> Int8,
    }
}

diesel::table! {
    project_details (project_id) {
        project_id -> Uuid,
        telegram_link -> Nullable<Text>,
        logo_url -> Nullable<Text>,
        name -> Text,
        short_description -> Text,
        long_description -> Text,
    }
}

diesel::table! {
    project_github_repos (project_id, github_repo_id) {
        project_id -> Uuid,
        github_repo_id -> Int8,
    }
}

diesel::table! {
    project_leads (project_id, user_id) {
        project_id -> Uuid,
        user_id -> Uuid,
    }
}

diesel::table! {
    projects (id) {
        id -> Uuid,
    }
}

diesel::table! {
    projects_sponsors (project_id, sponsor_id) {
        project_id -> Uuid,
        sponsor_id -> Uuid,
    }
}

diesel::table! {
    sponsors (id) {
        id -> Uuid,
        name -> Text,
        logo_url -> Text,
        url -> Nullable<Text>,
    }
}

diesel::table! {
    user_info (user_id) {
        user_id -> Uuid,
        identity -> Nullable<Jsonb>,
        location -> Nullable<Jsonb>,
        payout_settings -> Nullable<Jsonb>,
        contact_information -> Nullable<Jsonb>,
        are_payout_settings_valid -> Bool,
    }
}

diesel::table! {
    work_items (payment_id, repo_id, issue_number) {
        payment_id -> Uuid,
        issue_number -> Int8,
        repo_id -> Int8,
    }
}

diesel::joinable!(ignored_github_issues -> projects (project_id));
diesel::joinable!(pending_project_leader_invitations -> projects (project_id));
diesel::joinable!(projects_sponsors -> projects (project_id));
diesel::joinable!(projects_sponsors -> sponsors (sponsor_id));

diesel::allow_tables_to_appear_in_same_query!(
    budgets,
    event_deduplications,
    events,
    github_issues,
    github_repo_indexes,
    github_repos,
    github_repos_contributors,
    github_user_indexes,
    github_users,
    ignored_github_issues,
    payment_requests,
    payments,
    pending_project_leader_invitations,
    project_details,
    project_github_repos,
    project_leads,
    projects,
    projects_sponsors,
    sponsors,
    user_info,
    work_items,
);