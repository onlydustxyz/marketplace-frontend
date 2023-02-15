// @generated automatically by Diesel CLI.

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
    events_backup (index) {
        index -> Int4,
        timestamp -> Timestamp,
        aggregate_name -> Varchar,
        aggregate_id -> Varchar,
        payload -> Jsonb,
        metadata -> Nullable<Jsonb>,
    }
}

diesel::table! {
    github_repo_details (id) {
        id -> Int8,
        owner -> Text,
        name -> Text,
        languages -> Jsonb,
    }
}

diesel::table! {
    payment_requests (id) {
        id -> Uuid,
        budget_id -> Uuid,
        requestor_id -> Uuid,
        recipient_id -> Int8,
        amount_in_usd -> Int8,
        reason -> Jsonb,
        requested_at -> Timestamp,
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
    pending_project_leader_invitations (id) {
        id -> Uuid,
        project_id -> Uuid,
        github_user_id -> Int8,
    }
}

diesel::table! {
    project_details (project_id) {
        project_id -> Uuid,
        description -> Nullable<Text>,
        telegram_link -> Nullable<Text>,
        logo_url -> Nullable<Text>,
        name -> Text,
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
        github_repo_id -> Int8,
    }
}

diesel::table! {
    user_info (user_id) {
        user_id -> Uuid,
        identity -> Nullable<Jsonb>,
        location -> Nullable<Jsonb>,
        email -> Nullable<Text>,
        payout_settings -> Nullable<Jsonb>,
    }
}

diesel::joinable!(budgets -> projects (project_id));
diesel::joinable!(payment_requests -> budgets (budget_id));
diesel::joinable!(payments -> payment_requests (request_id));
diesel::joinable!(project_leads -> projects (project_id));

diesel::allow_tables_to_appear_in_same_query!(
    budgets,
    event_deduplications,
    events,
    events_backup,
    github_repo_details,
    payment_requests,
    payments,
    pending_project_leader_invitations,
    project_details,
    project_leads,
    projects,
    user_info,
);
