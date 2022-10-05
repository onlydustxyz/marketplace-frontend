table! {
    contact_information (id) {
        id -> Uuid,
        contributor_id -> Varchar,
        discord_handle -> Nullable<Varchar>,
    }
}

table! {
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
        contributor_account_address -> Nullable<Text>,
    }
}

table! {
    contributors (id) {
        id -> Text,
        account -> Text,
        github_identifier -> Text,
        github_username -> Text,
    }
}

table! {
    event_deduplications (deduplication_id) {
        deduplication_id -> Text,
        event_index -> Int4,
    }
}

table! {
    event_filters (indexer_id, source_contract) {
        indexer_id -> Text,
        source_contract -> Text,
    }
}

table! {
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

table! {
    events_backup (index) {
        index -> Int4,
        timestamp -> Timestamp,
        aggregate_name -> Varchar,
        aggregate_id -> Varchar,
        payload -> Jsonb,
        metadata -> Nullable<Jsonb>,
        origin -> Text,
    }
}

table! {
    indexers (id) {
        id -> Text,
        index_head -> Int8,
    }
}

table! {
    lead_contributors (project_id, account) {
        project_id -> Text,
        account -> Text,
    }
}

table! {
    pending_applications (contribution_id, contributor_account_address) {
        contribution_id -> Text,
        contributor_id -> Text,
        applied_at -> Timestamp,
        contributor_account_address -> Text,
    }
}

table! {
    project_members (project_id, contributor_account) {
        project_id -> Text,
        contributor_account -> Text,
    }
}

table! {
    projects (id) {
        id -> Varchar,
        owner -> Varchar,
        name -> Varchar,
        url -> Nullable<Varchar>,
        description -> Nullable<Varchar>,
        logo_url -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(
    contact_information,
    contributions,
    contributors,
    event_deduplications,
    event_filters,
    events,
    events_backup,
    indexers,
    lead_contributors,
    pending_applications,
    project_members,
    projects,
);
