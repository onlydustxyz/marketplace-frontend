BEGIN;

ALTER TABLE contributions DROP CONSTRAINT contributions_pkey;

ALTER TABLE contributions
    RENAME COLUMN id TO onchain_id;

ALTER TABLE contributions
    ADD id UUID NOT NULL DEFAULT gen_random_uuid();

ALTER TABLE contributions ADD PRIMARY KEY (id);
ALTER TABLE contributions ADD CONSTRAINT unique_onchain_id UNIQUE (onchain_id);

COMMIT;
