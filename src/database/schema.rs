table! {
    contribution_gates (id) {
        id -> Varchar,
        contribution_id -> Varchar,
        gate_id -> Varchar,
        transaction_hash -> Varchar,
    }
}

table! {
    contributions (id) {
        id -> Varchar,
        project_id -> Varchar,
        status -> Varchar,
        transaction_hash -> Nullable<Varchar>,
        author -> Varchar,
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

joinable!(contribution_gates -> contributions (contribution_id));
joinable!(contributions -> projects (project_id));

allow_tables_to_appear_in_same_query!(contribution_gates, contributions, projects,);
