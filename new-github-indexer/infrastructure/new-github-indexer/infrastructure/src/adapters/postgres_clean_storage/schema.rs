// @generated automatically by Diesel CLI.

pub mod indexer_clean {
    diesel::table! {
        indexer_clean.repos (repo_id) {
            repo_id -> Int8,
            value -> Jsonb,
        }
    }
}
