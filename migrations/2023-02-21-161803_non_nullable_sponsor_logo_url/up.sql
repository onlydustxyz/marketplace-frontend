UPDATE
  sponsors
SET
  logo_url = ''
WHERE
  logo_url IS NULL;

ALTER TABLE sponsors ALTER COLUMN logo_url SET NOT NULL;
