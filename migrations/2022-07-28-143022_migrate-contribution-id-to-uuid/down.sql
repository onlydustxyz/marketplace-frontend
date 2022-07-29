BEGIN;

ALTER TABLE contributions DROP CONSTRAINT contributions_pkey;
ALTER TABLE contributions DROP CONSTRAINT unique_onchain_id;
ALTER TABLE contributions DROP COLUMN id;

ALTER TABLE contributions
    RENAME COLUMN onchain_id TO id;

ALTER TABLE contributions ADD PRIMARY KEY (id);

COMMIT;
