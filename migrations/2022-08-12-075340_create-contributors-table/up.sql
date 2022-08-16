CREATE TABLE contributors(
    id VARCHAR PRIMARY KEY,
    discord_handle VARCHAR,
    github_handle VARCHAR,
    github_username VARCHAR
);

INSERT INTO contributors (id, discord_handle, github_handle, github_username)
   SELECT DISTINCT contributor_id, NULL, NULL, NULL
   FROM contributions;
