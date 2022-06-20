table! {
    projects (id) {
        id -> Int4,
        organisation -> Varchar,
        repository -> Varchar,
    }
}

table! {
    pull_requests (id) {
        id -> Varchar,
        pr_status -> Varchar,
        pr_smart_contract_status -> Varchar,
        author -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(projects, pull_requests,);
