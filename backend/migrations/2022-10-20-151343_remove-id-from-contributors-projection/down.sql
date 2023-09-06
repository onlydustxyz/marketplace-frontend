ALTER TABLE contributors
DROP CONSTRAINT contributors_pkey;

ALTER TABLE contributors RENAME TO contributors_temp;

CREATE TABLE "contributors" (
    "id" text NOT NULL,
    "account" text NOT NULL,
    "github_identifier" text,
    "github_username" text,
    "discord_handle" text,
    PRIMARY KEY ("id")
);


INSERT INTO contributors(id, account, github_identifier, github_username, discord_handle) (
    SELECT account, account, github_identifier, github_username, discord_handle
    FROM contributors_temp
);

DROP TABLE contributors_temp;
