ALTER TABLE contributions 
    RENAME COLUMN author TO contributor_id;

ALTER TABLE contributions 
    ADD title TEXT,
    ADD description TEXT,
    ADD external_link TEXT,
    ADD difficulty TEXT,
    ADD technology TEXT,
    ADD duration TEXT,
    ADD context TEXT,
    ADD type TEXT;