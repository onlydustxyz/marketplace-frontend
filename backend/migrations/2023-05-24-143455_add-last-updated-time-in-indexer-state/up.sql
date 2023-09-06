UPDATE github_user_indexes
SET user_indexer_state = jsonb_set(user_indexer_state, '{last_updated_time}', to_jsonb('2023-05-24T14:00:00Z'::text))
WHERE user_indexer_state IS NOT NULL AND NOT(user_indexer_state ? 'last_updated_time');
