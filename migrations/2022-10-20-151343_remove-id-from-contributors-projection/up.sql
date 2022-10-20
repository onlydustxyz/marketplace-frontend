ALTER TABLE contributors
DROP CONSTRAINT contributors_pkey;

ALTER TABLE contributors
ADD PRIMARY KEY (account);

ALTER TABLE contributors
DROP COLUMN id;
