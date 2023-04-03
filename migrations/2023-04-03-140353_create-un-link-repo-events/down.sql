DELETE FROM events WHERE aggregate_name = 'PROJECT' AND payload ? 'GithubRepoLinked';
