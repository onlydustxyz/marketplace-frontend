
UPDATE
	project_details
SET
	name = :'name'
WHERE
	project_id::text = :'id';
