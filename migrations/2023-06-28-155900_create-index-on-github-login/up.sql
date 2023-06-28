CREATE INDEX IF NOT EXISTS "github_users_login_idx" ON public.github_users (login);


CREATE INDEX IF NOT EXISTS "auth_users_login_at_signup_idx" ON public.auth_users (login_at_signup);
