// @generated automatically by Diesel CLI.

diesel::table! {
    applications (id) {
        id -> Uuid,
        contribution_id -> Text,
        contributor_id -> Text,
        status -> Text,
        applied_at -> Timestamp,
    }
}

diesel::table! {
    contact_information (id) {
        id -> Uuid,
        contributor_id -> Varchar,
        discord_handle -> Nullable<Varchar>,
    }
}

diesel::table! {
    contributions (id) {
        id -> Text,
        project_id -> Text,
        issue_number -> Text,
        status -> Text,
        gate -> Int4,
        contributor_id -> Nullable<Text>,
        title -> Nullable<Text>,
        description -> Nullable<Text>,
        external_link -> Nullable<Text>,
        difficulty -> Nullable<Text>,
        technology -> Nullable<Text>,
        duration -> Nullable<Text>,
        context -> Nullable<Text>,
        #[sql_name = "type"]
        type_ -> Nullable<Text>,
    }
}

diesel::table! {
    contributors (id) {
        id -> Text,
        account -> Text,
        github_identifier -> Text,
        github_username -> Text,
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
    }
}

diesel::table! {
    project_members (project_id, contributor_account) {
        project_id -> Text,
        contributor_account -> Text,
        is_lead_contributor -> Bool,
    }
}

diesel::table! {
    projects (id) {
        id -> Varchar,
        owner -> Varchar,
        name -> Varchar,
        url -> Nullable<Varchar>,
        description -> Nullable<Varchar>,
        logo_url -> Nullable<Varchar>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    applications,
    contact_information,
    contributions,
    contributors,
    event_deduplications,
    events,
    project_members,
    projects,
);
