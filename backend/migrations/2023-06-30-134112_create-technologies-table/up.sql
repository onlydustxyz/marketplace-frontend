CREATE TABLE
    technologies (technology TEXT PRIMARY KEY);


CREATE OR REPLACE VIEW
    api.technologies as
SELECT
    technology
from
    public.technologies;