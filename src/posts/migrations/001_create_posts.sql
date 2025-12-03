CREATE TABLE posts (
  id varchar(36) PRIMARY KEY,
  author_id varchar(36) NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE post_reactions (
  id varchar(36) PRIMARY KEY,
  post_id varchar(36) NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id varchar(36) NOT NULL,
  type varchar(50) NOT NULL
);

CREATE TABLE post_comments (
  id varchar(36) PRIMARY KEY,
  post_id varchar(36) NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id varchar(36) NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
