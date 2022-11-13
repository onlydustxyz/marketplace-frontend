BEGIN TRANSACTION;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_identifier TEXT,
    github_username TEXT,
    discord_handle TEXT
);

INSERT INTO users (github_identifier, github_username, discord_handle)
SELECT github_identifier, github_username, discord_handle FROM contributors;

DROP TABLE contributors;

COMMIT TRANSACTION;
