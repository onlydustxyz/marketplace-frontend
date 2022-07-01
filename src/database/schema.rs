table! {
    projects (id) {
        id -> Varchar,
        organisation -> Varchar,
        repository -> Varchar,
        last_indexed_time -> Nullable<Timestamp>,
    }
}

table! {
    pull_requests (id) {
        id -> Varchar,
        project_id -> Varchar,
        pr_status -> Varchar,
        transaction_hash -> Nullable<Varchar>,
        author -> Varchar,
    }
}

joinable!(pull_requests -> projects (project_id));

allow_tables_to_appear_in_same_query!(
    projects,
    pull_requests,
);
