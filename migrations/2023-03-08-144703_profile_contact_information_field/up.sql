ALTER TABLE user_info
ADD COLUMN contact_information JSONB;

UPDATE user_info
SET contact_information = jsonb_build_object('email', email)
WHERE email IS NOT NULL;

ALTER TABLE user_info
DROP COLUMN email;
