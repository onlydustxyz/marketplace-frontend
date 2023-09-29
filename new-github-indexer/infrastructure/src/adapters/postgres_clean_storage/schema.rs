// @generated automatically by Diesel CLI.

pub mod indexer_clean {
    diesel::table! {
        indexer_clean.issues (id) {
            id -> Int8,
            repo_id -> Int8,
            number -> Int8,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.pull_request_closing_issues (pull_request_id, issue_id) {
            pull_request_id -> Int8,
            issue_id -> Int8,
            indexed_at -> Timestamp,
        }
    }

    diesel::table! {
        indexer_clean.pull_request_commits (repo_id, pull_request_id, sha) {
            repo_id -> Int8,
            pull_request_id -> Int8,
            sha -> Text,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.pull_request_reviews (id) {
            id -> Int8,
            pull_request_id -> Int8,
            reviewer_id -> Int8,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.pull_requests (id) {
            id -> Int8,
            repo_id -> Int8,
            number -> Int8,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.repo_check_runs (repo_id, sha) {
            repo_id -> Int8,
            sha -> Text,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.repo_languages (repo_id) {
            repo_id -> Int8,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.repos (id) {
            id -> Int8,
            owner -> Text,
            name -> Text,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.user_social_accounts (user_id) {
            user_id -> Int8,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::table! {
        indexer_clean.users (id) {
            id -> Int8,
            login -> Text,
            indexed_at -> Timestamp,
            data -> Jsonb,
        }
    }

    diesel::joinable!(issues -> repos (repo_id));
    diesel::joinable!(pull_request_closing_issues -> issues (issue_id));
    diesel::joinable!(pull_request_closing_issues -> pull_requests (pull_request_id));
    diesel::joinable!(pull_request_commits -> pull_requests (pull_request_id));
    diesel::joinable!(pull_request_commits -> repos (repo_id));
    diesel::joinable!(pull_request_reviews -> pull_requests (pull_request_id));
    diesel::joinable!(pull_request_reviews -> users (reviewer_id));
    diesel::joinable!(pull_requests -> repos (repo_id));
    diesel::joinable!(repo_check_runs -> repos (repo_id));
    diesel::joinable!(repo_languages -> repos (repo_id));
    diesel::joinable!(user_social_accounts -> users (user_id));

    diesel::allow_tables_to_appear_in_same_query!(
        issues,
        pull_request_closing_issues,
        pull_request_commits,
        pull_request_reviews,
        pull_requests,
        repo_check_runs,
        repo_languages,
        repos,
        user_social_accounts,
        users,
    );
}
