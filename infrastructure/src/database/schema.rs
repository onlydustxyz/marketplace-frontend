// @generated automatically by Diesel CLI.

diesel::table! {
    budget_spenders (budget_id, user_id) {
        budget_id -> Uuid,
        user_id -> Uuid,
    }
}

diesel::table! {
    budgets (id) {
        id -> Uuid,
        project_id -> Nullable<Uuid>,
        initial_amount -> Numeric,
        remaining_amount -> Numeric,
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
        budget_id -> Uuid,
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
        receipt -> Jsonb,
        request_id -> Uuid,
    }
}

diesel::table! {
    payout_settings (user_id) {
        user_id -> Uuid,
        eth_wallet_address -> Nullable<Text>,
    }
}

diesel::table! {
    project_details (project_id) {
        project_id -> Uuid,
        description -> Nullable<Text>,
        telegram_link -> Nullable<Text>,
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
        github_repo_id -> Int8,
    }
}

diesel::joinable!(budget_spenders -> budgets (budget_id));
diesel::joinable!(budgets -> projects (project_id));
diesel::joinable!(payment_requests -> budgets (budget_id));
diesel::joinable!(payments -> payment_requests (request_id));
diesel::joinable!(project_leads -> projects (project_id));

diesel::allow_tables_to_appear_in_same_query!(
    budget_spenders,
    budgets,
    event_deduplications,
    event_filters,
    events,
    indexers,
    payment_requests,
    payments,
    payout_settings,
    project_details,
    project_leads,
    projects,
);
