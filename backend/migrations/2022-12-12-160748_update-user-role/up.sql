UPDATE auth.user_roles
SET role = 'registered_user'
WHERE role = 'user';

UPDATE auth.users
SET default_role = 'registered_user'
WHERE default_role = 'public' OR default_role = 'user';
