CREATE TABLE github_users (
    id BIGINT PRIMARY KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    html_url TEXT NOT NULL
);
