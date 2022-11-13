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
    payments (id) {
        id -> Uuid,
        amount -> Numeric,
        currency_code -> Text,
        recipient_id -> Uuid,
        reason -> Jsonb,
        receipt -> Nullable<Jsonb>,
    }
}

diesel::table! {
    payout_settings (user_id) {
        user_id -> Uuid,
        eth_wallet_address -> Nullable<Text>,
    }
}

diesel::table! {
    pending_applications (contribution_id, contributor_account_address) {
        contribution_id -> Text,
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

diesel::table! {
    users (id) {
        id -> Uuid,
        github_identifier -> Nullable<Text>,
        github_username -> Nullable<Text>,
        discord_handle -> Nullable<Text>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    contributions,
    event_deduplications,
    event_filters,
    events,
    indexers,
    lead_contributors,
    payments,
    payout_settings,
    pending_applications,
    project_members,
    projects,
    users,
);
