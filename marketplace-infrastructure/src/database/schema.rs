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
    payment_requests (id) {
        id -> Uuid,
        project_id -> Uuid,
        requestor_id -> Uuid,
        recipient_id -> Uuid,
        amount_in_usd -> Int8,
        reason -> Jsonb,
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
    project_leads (project_id, user_id) {
        project_id -> Uuid,
        user_id -> Uuid,
    }
}

diesel::table! {
    projects (id) {
        id -> Uuid,
        name -> Text,
    }
}

diesel::joinable!(payment_requests -> projects (project_id));
diesel::joinable!(project_leads -> projects (project_id));

diesel::allow_tables_to_appear_in_same_query!(
    event_deduplications,
    event_filters,
    events,
    indexers,
    payment_requests,
    payments,
    payout_settings,
    project_leads,
    projects,
);
