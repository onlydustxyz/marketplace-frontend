-- repos
drop table indexer_clean.repos;


create table
    indexer_clean.repos (
        id bigint primary key,
        owner text not null,
        name text not null,
        indexed_at timestamp not null,
        data JSONB NOT NULL
    );


create index repo_owner_name on indexer_clean.repos (owner, name);


create table
    indexer_clean.repo_languages (
        repo_id bigint primary key references indexer_clean.repos (id),
        indexed_at timestamp not null,
        data JSONB NOT NULL
    );


create table
    indexer_clean.repo_check_runs (
        repo_id bigint NOT NULL references indexer_clean.repos (id),
        sha TEXT NOT NULL,
        indexed_at timestamp not null,
        data JSONB NOT NULL,
        PRIMARY KEY (repo_id, sha)
    );


-- users
create table
    indexer_clean.users (id bigint primary key, login TEXT not null, indexed_at timestamp not null, data JSONB NOT NULL);


create index users_login on indexer_clean.users (login);


create table
    indexer_clean.user_social_accounts (
        user_id bigint primary key references indexer_clean.users (id),
        indexed_at timestamp not null,
        data JSONB NOT NULL
    );


-- issues
create table
    indexer_clean.issues (
        id bigint primary key,
        repo_id bigint not null references indexer_clean.repos (id),
        number bigint not null,
        indexed_at timestamp not null,
        data JSONB NOT NULL
    );


create index issues_repo_id_number on indexer_clean.issues (repo_id, number);


-- pull requests
create table
    indexer_clean.pull_requests (
        id bigint primary key,
        repo_id bigint not null references indexer_clean.repos (id),
        number bigint not null,
        indexed_at timestamp not null,
        data JSONB NOT NULL
    );


create index pull_requests_repo_id_number on indexer_clean.pull_requests (repo_id, number);


create table
    indexer_clean.pull_request_reviews (
        id bigint primary key,
        pull_request_id bigint NOT NULL references indexer_clean.pull_requests (id),
        reviewer_id bigint NOT NULL references indexer_clean.users (id),
        indexed_at timestamp not null,
        data JSONB NOT NULL
    );


create table
    indexer_clean.pull_request_commits (
        repo_id bigint NOT NULL references indexer_clean.repos (id),
        pull_request_id bigint NOT NULL references indexer_clean.pull_requests (id),
        sha TEXT NOT NULL,
        indexed_at timestamp not null,
        data JSONB NOT NULL,
        PRIMARY KEY (repo_id, pull_request_id, sha)
    );


create table
    indexer_clean.pull_request_closing_issues (
        pull_request_id bigint references indexer_clean.pull_requests (id),
        issue_id bigint references indexer_clean.issues (id),
        indexed_at timestamp not null,
        PRIMARY KEY (pull_request_id, issue_id)
    );


create unique index pull_request_closing_issues_issue_id_pull_request_id on indexer_clean.pull_request_closing_issues (issue_id, pull_request_id);
