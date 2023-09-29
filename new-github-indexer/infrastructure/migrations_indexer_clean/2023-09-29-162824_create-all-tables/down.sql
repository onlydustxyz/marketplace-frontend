drop table indexer_clean.repos CASCADE;


drop table indexer_clean.repo_languages;


drop table indexer_clean.pull_request_commits;


drop table indexer_clean.users CASCADE;


drop table indexer_clean.user_social_accounts;


drop table indexer_clean.issues CASCADE;


drop table indexer_clean.pull_requests CASCADE;


drop table indexer_clean.pull_request_reviews;


drop table indexer_clean.pull_request_closing_issues;


drop table indexer_clean.repo_check_runs;


create table
    indexer_clean.repos (repo_id bigint primary key, value jsonb not null);
