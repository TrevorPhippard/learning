CREATE TABLE profiles (
  id varchar(36) PRIMARY KEY,
  user_account_id varchar(36) NOT NULL,
  full_name text NOT NULL,
  headline text,
  summary text,
  profile_image text,
  banner_image text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE skills (
  id varchar(36) PRIMARY KEY,
  profile_id varchar(36) NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  endorsements integer DEFAULT 0 NOT NULL
);

CREATE TABLE experiences (
  id varchar(36) PRIMARY KEY,
  profile_id varchar(36) NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  title text NOT NULL,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone,
  description text,
  ord integer DEFAULT 0 NOT NULL
);
