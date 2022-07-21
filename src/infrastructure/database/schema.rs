table! {
    contributions (id) {
        id -> Varchar,
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
