ALTER TABLE crm_github_repos
    ADD description TEXT NOT NULL DEFAULT '',
    ADD stars INT NOT NULL DEFAULT 0,
    ADD fork_count INT NOT NULL DEFAULT 0,
    ADD html_url TEXT NOT NULL DEFAULT ''
;
