UPDATE events
SET payload = payload->'Contribution'
WHERE payload ? 'Contribution' ;

UPDATE events
SET payload = payload->'Project'
WHERE payload ? 'Project' ;

UPDATE events
SET payload = payload->'Contributor'
WHERE payload ? 'Contributor';
