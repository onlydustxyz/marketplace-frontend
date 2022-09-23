-- {"Contributor": {"GithubAccountAssociated": {"contributor_id": "0x0684f2ae394544ce08fdc1f99bc9e3a07e7abb3eb02c82f6e21d8a6b45e178f0", "github_identifier": 595505, "contributor_account": "0x0684f2ae394544ce08fdc1f99bc9e3a07e7abb3eb02c82f6e21d8a6b45e178f0"}}}

INSERT INTO events
	("timestamp", 
	aggregate_name, 
	aggregate_id, 
	payload)
select
	'2022-06-06 10:10:10.000',
	'CONTRIBUTOR',
	c.account,
	jsonb_build_object('Contributor', 
		jsonb_build_object('GithubAccountAssociated', 
			jsonb_build_object(
				'github_identifier', c.github_identifier::integer,
				'contributor_account', c.account,
				'contributor_id', c.id 
			)
		)
	)
from contributors c;
