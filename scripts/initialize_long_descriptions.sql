UPDATE
	project_details
SET
	long_description = short_description
WHERE
    LENGTH(long_description) = 0;
