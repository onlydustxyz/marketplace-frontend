ALTER TABLE contributions
	ADD contributor_account_address TEXT;

UPDATE
	contributions
SET
	contributor_account_address = contributors.account
FROM
	contributors
WHERE
	contributions.contributor_id = contributors.id
    OR contributions.contributor_id = contributors.account; -- just in case a refresh has been done
