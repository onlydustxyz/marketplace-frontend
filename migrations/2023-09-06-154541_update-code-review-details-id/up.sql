UPDATE contributions
SET
    details_id = gr.id
FROM
    github_pull_request_reviews gr
WHERE
    details_id = gr.pull_request_id::text
    AND "type" = 'code_review'::contribution_type
    AND user_id = gr.reviewer_id;