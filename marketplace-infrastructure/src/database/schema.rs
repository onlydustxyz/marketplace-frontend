table! {
    applications (id) {
        id -> Uuid,
        contribution_id -> Text,
        contributor_id -> Text,
        status -> Text,
    }
}

table! {
    applications_backup (id) {
        id -> Uuid,
        contribution_id -> Uuid,
        contributor_id -> Varchar,
        status -> Varchar,
    }
}

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
    }
}

table! {
    contributions_backup (id) {
        onchain_id -> Varchar,
        project_id -> Varchar,
        status -> Varchar,
        transaction_hash -> Nullable<Varchar>,
        contributor_id -> Varchar,
        gate -> Int2,
        title -> Nullable<Text>,
        description -> Nullable<Text>,
        external_link -> Nullable<Text>,
        difficulty -> Nullable<Text>,
        technology -> Nullable<Text>,
        duration -> Nullable<Text>,
        context -> Nullable<Text>,
        #[sql_name = "type"]
        type_ -> Nullable<Text>,
        id -> Uuid,
    }
}

table! {
    event_deduplications (deduplication_id) {
        deduplication_id -> Text,
    }
}

table! {
    events (index) {
        index -> Int4,
        timestamp -> Timestamp,
        aggregate_name -> Varchar,
        aggregate_id -> Varchar,
        payload -> Jsonb,
    }
}

table! {
    projects (id) {
        id -> Varchar,
        owner -> Varchar,
        name -> Varchar,
        last_indexed_time -> Nullable<Timestamp>,
    }
}

joinable!(applications -> contributions (contribution_id));
joinable!(applications_backup -> contributions_backup (contribution_id));
joinable!(contributions -> projects (project_id));
joinable!(contributions_backup -> projects (project_id));

allow_tables_to_appear_in_same_query!(
    applications,
    applications_backup,
    contact_information,
    contributions,
    contributions_backup,
    event_deduplications,
    events,
    projects,
);
