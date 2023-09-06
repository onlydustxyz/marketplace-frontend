CREATE TABLE applications (
    id UUID PRIMARY KEY,
    received_at TIMESTAMP NOT NULL,
    project_id UUID NOT NULL,
    applicant_id UUID NOT NULL
);
