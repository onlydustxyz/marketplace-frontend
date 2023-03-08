CREATE OR REPLACE FUNCTION is_not_null (value jsonb)
	RETURNS BOOLEAN
	LANGUAGE plpgsql
	AS $$
BEGIN
	RETURN value IS NOT NULL
       AND value != 'null';
END
$$;

CREATE OR REPLACE FUNCTION is_person_identity_complete (person jsonb)
	RETURNS BOOLEAN
	LANGUAGE plpgsql
	AS $$
BEGIN
	RETURN is_not_null (person -> 'firstname')
       AND is_not_null (person -> 'lastname');
END
$$;

CREATE OR REPLACE FUNCTION is_identity_complete (identity jsonb)
	RETURNS BOOLEAN
	LANGUAGE plpgsql
    IMMUTABLE
	AS $$
DECLARE
	person jsonb := identity -> 'Person';
	company jsonb := identity -> 'Company';
BEGIN
	IF person IS NOT NULL THEN
		RETURN is_person_identity_complete (person);
	END IF;

	IF company IS NOT NULL THEN
		RETURN  is_not_null (company -> 'name')
			AND is_not_null (company -> 'identification_number')
			AND is_person_identity_complete (company -> 'owner');
	END IF;

	RETURN FALSE;
END
$$;

CREATE OR REPLACE FUNCTION is_location_complete (location jsonb)
	RETURNS BOOLEAN
	LANGUAGE plpgsql
    IMMUTABLE
	AS $$
BEGIN
	RETURN  is_not_null (location -> 'address')
        AND is_not_null (location -> 'city')
        AND is_not_null (location -> 'country')
        AND is_not_null (location -> 'post_code');
END
$$;

CREATE OR REPLACE FUNCTION is_payout_settings_complete (payout_settings jsonb)
	RETURNS BOOLEAN
	LANGUAGE plpgsql
    IMMUTABLE
	AS $$
DECLARE
	eth jsonb := payout_settings -> 'EthTransfer';
	wire jsonb := payout_settings -> 'WireTransfer';
BEGIN
	IF eth IS NOT NULL THEN
		RETURN is_not_null (eth -> 'Name')
            OR is_not_null (eth -> 'Address');
	END IF;

	IF wire IS NOT NULL THEN
		RETURN is_not_null (wire -> 'BIC')
           AND is_not_null (wire -> 'IBAN');
	END IF;

	RETURN FALSE;
END
$$;


ALTER TABLE user_info
	DROP COLUMN are_payout_settings_valid;

ALTER TABLE user_info
	ADD are_payout_settings_valid BOOLEAN NOT NULL GENERATED ALWAYS AS (
        is_identity_complete (identity)
	AND is_location_complete (location)
	AND is_payout_settings_complete (payout_settings)
) STORED;
