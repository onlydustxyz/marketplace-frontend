create table indexer_clean.repos
(
    repo_id bigint primary key,
    value jsonb not null
);