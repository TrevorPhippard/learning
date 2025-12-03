CREATE TABLE companies (
  id varchar(36) PRIMARY KEY,
  name varchar(255) NOT NULL,
  description text,
  website varchar(255),
  industry varchar(255),
  location varchar(255),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);