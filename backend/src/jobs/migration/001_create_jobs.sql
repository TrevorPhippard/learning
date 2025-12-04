CREATE TABLE jobs (
  id varchar(36) PRIMARY KEY,
  author_id varchar(36) NOT NULL,
  company_id varchar(36),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  location varchar(255),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);
