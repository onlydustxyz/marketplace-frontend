BEGIN;

ALTER TABLE project_leads
    DROP CONSTRAINT project_leads_user_id_fkey;

ALTER TABLE project_leads
    ADD CONSTRAINT project_leads_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);

ALTER TABLE payment_requests
    DROP CONSTRAINT payment_requests_requestor_id_fkey;

ALTER TABLE payment_requests
    DROP CONSTRAINT payment_requests_recipient_id_fkey;

ALTER TABLE payment_requests
    ADD CONSTRAINT payment_requests_requestor_id_fkey FOREIGN KEY (requestor_id) REFERENCES auth.users(id);

ALTER TABLE payment_requests
    ADD CONSTRAINT payment_requests_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES auth.users(id);

DROP TABLE users;

COMMIT;
