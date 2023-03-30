
ALTER TABLE work_items ADD COLUMN repo_id BIGINT NOT NULL DEFAULT 0;

UPDATE work_items SET repo_id = id FROM github_repo_details WHERE work_items.repo_owner = owner AND work_items.repo_name = name;

ALTER TABLE work_items DROP CONSTRAINT work_items_pkey;
ALTER TABLE work_items ADD PRIMARY KEY (payment_id, repo_id, issue_number);


create table temp_work_items as
select
	index as event_index,
	github_repo_details.id as repo_id,
	parsed_urls.issue_number
from
	github_repo_details,
	(
		SELECT
			index,
			work_item [1] AS repo_owner,
			work_item [2] AS repo_name,
			work_item [4]::bigint AS issue_number
		FROM (
			select index, regexp_match (url::text, '"https://github.com/(.*)/(.*)/(pull|issue.?)/(.*)"') AS work_item
			from (
				select
					index,
					jsonb_array_elements(payload #> '{Budget,event,Payment,event,Requested,reason,work_items}') as url
				from
					events
				where
					payload @? '$.Budget.event.Payment.event.Requested'
			) as work_items
		) as parsed_urls
	) as parsed_urls
where
	github_repo_details."owner" ilike parsed_urls.repo_owner
	and github_repo_details."name" ilike parsed_urls.repo_name
;


UPDATE
	events
SET
	payload = jsonb_set(payload, '{Budget,event,Payment,event,Requested,reason,work_items}', t.work_items)
FROM (
	SELECT
		jsonb_agg(to_jsonb (temp_work_items) - 'event_index') AS work_items,
		event_index
	FROM
		temp_work_items
	GROUP BY
		event_index) AS t
WHERE
	events.index = t.event_index;


DROP TABLE temp_work_items;

ALTER TABLE work_items DROP COLUMN repo_owner, DROP COLUMN repo_name;
ALTER TABLE github_repo_details DROP COLUMN owner, DROP COLUMN name;
