CREATE TABLE payment_requests(
    id UUID PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id),
    requestor_id UUID NOT NULL REFERENCES users(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    amount_in_usd BIGINT NOT NULL,
    reason JSONB NOT NULL,
    FOREIGN KEY (project_id, requestor_id) REFERENCES project_leads(project_id, user_id)
);
