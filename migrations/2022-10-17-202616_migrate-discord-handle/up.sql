ALTER TABLE contributors
ADD discord_handle TEXT;

ALTER TABLE contributors
ALTER COLUMN github_identifier DROP NOT NULL;

ALTER TABLE contributors
ALTER COLUMN github_username DROP NOT NULL;

UPDATE contributors
SET discord_handle = contact_information.discord_handle
FROM contact_information
WHERE contact_information.contributor_id = contributors.id;

DROP TABLE contact_information;

INSERT INTO events(timestamp, aggregate_name, aggregate_id, payload, origin) (
    SELECT current_timestamp AT TIME ZONE 'UTC', 'CONTRIBUTOR', account, json_build_object('Contributor', json_build_object('DiscordHandleRegistered', json_build_object('contributor_account_address', account, 'discord_handle', discord_handle))), 'backend'
    FROM contributors
    WHERE discord_handle IS NOT NULL
);
