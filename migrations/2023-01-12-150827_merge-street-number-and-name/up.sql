-- Your SQL goes here

UPDATE user_info SET "location" = jsonb_set(location, '{address}', to_jsonb(c.address))
FROM (
    SELECT b.user_id, concat(b.number, ' ', b.street) AS address
    FROM (
        SELECT user_id, location::json->>'number' AS number, location::json->>'street' AS street FROM user_info
    ) AS b
) AS c
WHERE c.user_id = user_info.user_id;

UPDATE user_info SET "location" = "location" #- '{number}';
UPDATE user_info SET "location" = "location" #- '{street}';
