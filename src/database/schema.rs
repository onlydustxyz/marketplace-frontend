table! {
    contributions (id) {
        id -> Varchar,
        project_id -> Varchar,
        status -> Varchar,
        transaction_hash -> Nullable<Varchar>,
        author -> Varchar,
        gate -> Int2,
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

joinable!(contributions -> projects (project_id));

allow_tables_to_appear_in_same_query!(contributions, projects,);
