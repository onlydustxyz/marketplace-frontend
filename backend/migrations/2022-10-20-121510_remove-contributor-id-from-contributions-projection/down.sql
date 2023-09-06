ALTER TABLE contributions RENAME TO contributions_temp;

CREATE TABLE "contributions" (
    "id" text NOT NULL PRIMARY KEY,
    "project_id" text NOT NULL,
    "issue_number" text NOT NULL,
    "status" text NOT NULL,
    "gate" int4 NOT NULL,
    "contributor_id" text,
    "title" text,
    "description" text,
    "external_link" text,
    "difficulty" text,
    "technology" text,
    "duration" text,
    "context" text,
    "type" text,
    "contributor_account_address" text,
    "closed" bool NOT NULL DEFAULT false
);

INSERT INTO contributions("id", "project_id", "issue_number", "status", "gate", "contributor_id", "title", "description", "external_link", "difficulty", "technology", "duration", "context", "type", "contributor_account_address", "closed") (
    SELECT "id", "project_id", "issue_number", "status", "gate", "contributor_account_address", "title", "description", "external_link", "difficulty", "technology", "duration", "context", "type", "contributor_account_address", "closed"
    FROM contributions_temp
);

DROP TABLE contributions_temp;
