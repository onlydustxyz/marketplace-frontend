ALTER TABLE user_payout_info
RENAME TO user_info;


DELETE FROM user_profile_info;


ALTER TABLE user_info
ADD contact_information JSONB;
