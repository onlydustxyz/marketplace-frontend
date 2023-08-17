CREATE TYPE contribution_status AS enum('in_progress', 'complete', 'canceled');

ALTER TABLE contributions
    ADD COLUMN status contribution_status NOT NULL DEFAULT ('in_progress');
