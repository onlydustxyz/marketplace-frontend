BEGIN;

ALTER TABLE project_leads
    DROP CONSTRAINT project_leads_user_id_fkey;

ALTER TABLE payment_requests
    DROP CONSTRAINT payment_requests_requestor_id_fkey;

ALTER TABLE payment_requests
    DROP CONSTRAINT payment_requests_recipient_id_fkey;

DROP TABLE users;

COMMIT;
