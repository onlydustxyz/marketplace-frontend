ALTER TABLE project_leads
ADD COLUMN assigned_at TIMESTAMP NOT NULL DEFAULT NOW();


UPDATE events
SET
    payload = JSONB_SET(payload, '{LeaderAssigned,assigned_at}', TO_JSONB(events."timestamp"), TRUE)
WHERE
    payload ? 'LeaderAssigned';