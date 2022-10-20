// @generated automatically by Diesel CLI.

diesel::table! {
    contributions (id) {
        id -> Text,
        project_id -> Text,
        issue_number -> Text,
        status -> Text,
        gate -> Int4,
        title -> Nullable<Text>,
        description -> Nullable<Text>,
        external_link -> Nullable<Text>,
        difficulty -> Nullable<Text>,
        technology -> Nullable<Text>,
        duration -> Nullable<Text>,
        context -> Nullable<Text>,
        #[sql_name = "type"]
        type_ -> Nullable<Text>,
        contributor_account_address -> Nullable<Text>,
        closed -> Bool,
    }
}

diesel::table! {
    contributors (id) {
        id -> Text,
        account -> Text,
        github_identifier -> Nullable<Text>,
        github_username -> Nullable<Text>,
        discord_handle -> Nullable<Text>,
    }
}

diesel::table! {
    event_deduplications (deduplication_id) {
        deduplication_id -> Text,
        event_index -> Int4,
    }
}

diesel::table! {
    event_filters (indexer_id, source_contract) {
        indexer_id -> Text,
        source_contract -> Text,
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
        origin -> Text,
    }
}

diesel::table! {
    indexers (id) {
        id -> Text,
        index_head -> Int8,
    }
}

diesel::table! {
    lead_contributors (project_id, account) {
        project_id -> Text,
        account -> Text,
    }
}

diesel::table! {
    pending_applications (contribution_id, contributor_account_address) {
        contribution_id -> Text,
        contributor_id -> Text,
        applied_at -> Timestamp,
        contributor_account_address -> Text,
    }
}

diesel::table! {
    project_members (project_id, contributor_account) {
        project_id -> Text,
        contributor_account -> Text,
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
    contributions,
    contributors,
    event_deduplications,
    event_filters,
    events,
    indexers,
    lead_contributors,
    pending_applications,
    project_members,
    projects,
);
