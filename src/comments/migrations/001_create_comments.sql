CREATE TABLE comments (
  id varchar(36) PRIMARY KEY,
  post_id varchar(36) NOT NULL,
  author_id varchar(36) NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);