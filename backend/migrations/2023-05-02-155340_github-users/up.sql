CREATE TABLE github_users (
    id BIGINT PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    html_url TEXT NOT NULL
);

CREATE TABLE github_user_indexes (
    user_id BIGINT PRIMARY KEY,
    last_indexed_time TIMESTAMP,
    is_registered BOOLEAN NOT NULL
);
