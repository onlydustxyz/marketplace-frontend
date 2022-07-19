ALTER TABLE contributions 
    RENAME COLUMN contributor_id TO author;

ALTER TABLE contributions 
    DROP COLUMN title,
    DROP COLUMN description,
    DROP COLUMN external_link,
    DROP COLUMN difficulty,
    DROP COLUMN technology,
    DROP COLUMN duration,
    DROP COLUMN context,
    DROP COLUMN type;