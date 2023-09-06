CREATE TABLE contact_information(
    id UUID PRIMARY KEY,
    contributor_id VARCHAR NOT NULL,
    discord_handle VARCHAR
);

CREATE UNIQUE INDEX contact_informations_contributor_id_idx ON contact_information (contributor_id);

INSERT INTO contact_information (id, contributor_id, discord_handle) (
    SELECT gen_random_uuid(), id, discord_handle
    FROM contributors
    WHERE discord_handle IS NOT NULL
);

DELETE FROM contributors
WHERE github_identifier IS NULL;

ALTER TABLE contributors
DROP COLUMN discord_handle;

ALTER TABLE contributors
ALTER COLUMN github_identifier SET NOT NULL;

ALTER TABLE contributors
ALTER COLUMN github_username SET NOT NULL;

DELETE FROM events
WHERE payload -> 'Contributor' -> 'DiscordHandleRegistered' IS NOT NULL;
