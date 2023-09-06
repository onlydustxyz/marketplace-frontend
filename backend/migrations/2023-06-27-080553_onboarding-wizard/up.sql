ALTER TABLE terms_and_conditions_acceptances
RENAME TO onboardings;


ALTER TABLE onboardings
ADD COLUMN profile_wizard_display_date TIMESTAMP;


ALTER TABLE onboardings
RENAME COLUMN acceptance_date TO terms_and_conditions_acceptance_date;


ALTER TABLE onboardings
ALTER COLUMN terms_and_conditions_acceptance_date
DROP NOT NULL;
