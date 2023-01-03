CREATE TABLE pending_project_leader_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    github_user_id BIGINT NOT NULL,
    UNIQUE (project_id, github_user_id)
);
