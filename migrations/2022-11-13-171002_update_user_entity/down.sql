BEGIN TRANSACTION;

CREATE TABLE contributors (
    account TEXT PRIMARY KEY,
    github_identifier TEXT,
    github_username TEXT,
    discord_handle TEXT
);

DROP TABLE users;

COMMIT TRANSACTION;
