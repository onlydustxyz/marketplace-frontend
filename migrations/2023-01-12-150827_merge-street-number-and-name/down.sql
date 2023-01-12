-- This file should undo anything in `up.sql`

UPDATE user_info SET
"location" = jsonb_set(jsonb_set(location, '{street}', to_jsonb(bar.street)), '{number}', to_jsonb(bar.number))
FROM (
    SELECT user_id, address->>0 as number, address->>1 as street
    FROM (
        SELECT user_id, to_jsonb(regexp_matches("location"::json->>'address', '^([^ ]+) (.*)$')) as address FROM user_info
    ) as foo
) as bar
WHERE bar.user_id = user_info.user_id;

UPDATE user_info SET "location" = "location" #- '{address}';
