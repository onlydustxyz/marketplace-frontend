CREATE TYPE allocated_time AS ENUM('none', 'lt1day', '1to3days', 'gt3days');


ALTER TABLE user_profile_info
ADD COLUMN weekly_allocated_time allocated_time NOT NULL DEFAULT 'none';