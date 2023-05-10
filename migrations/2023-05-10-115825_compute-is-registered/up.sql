CREATE OR REPLACE FUNCTION public.insert_github_user_indexes_from_auth_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update a row into table github_user_indexes when a row is inserted in auth.user_providers
  INSERT INTO public.github_user_indexes (user_id)
    VALUES (NEW.provider_user_id::bigint)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE github_user_indexes DROP COLUMN is_registered;
