CREATE OR REPLACE FUNCTION public.insert_github_user_indexes_from_auth_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update a row into table github_user_indexes when a row is inserted in auth.user_providers
  INSERT INTO public.github_user_indexes (user_id, is_registered)
    VALUES (NEW.provider_user_id::bigint, true)
  ON CONFLICT (user_id) DO UPDATE
    SET is_registered = true;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_github_user_indexes_from_auth_users_trigger
AFTER INSERT ON auth.user_providers
FOR EACH ROW
EXECUTE FUNCTION public.insert_github_user_indexes_from_auth_users();


INSERT INTO github_user_indexes (user_id, is_registered)
  SELECT provider_user_id::bigint, true FROM auth.user_providers
ON CONFLICT (user_id) DO UPDATE
  SET is_registered = true;
