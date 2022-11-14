// @generated automatically by Diesel CLI.

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
    lead_contributors (project_id, contributor_id) {
        project_id -> Text,
        contributor_id -> Uuid,
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
    users (id) {
        id -> Uuid,
        github_identifier -> Nullable<Text>,
        github_username -> Nullable<Text>,
        discord_handle -> Nullable<Text>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    event_deduplications,
    event_filters,
    events,
    indexers,
    lead_contributors,
    payments,
    payout_settings,
    users,
);
