ALTER TABLE user_info
RENAME TO user_payout_info;


INSERT INTO
    user_profile_info (id, email, discord, twitter, telegram)
SELECT
    user_id as id,
    contact_information ->> 'email' AS email,
    contact_information ->> 'discord' AS discord,
    contact_information ->> 'twitter' AS twitter,
    contact_information ->> 'telegram' AS telegram
FROM
    user_payout_info;


ALTER TABLE user_payout_info
DROP COLUMN contact_information;
