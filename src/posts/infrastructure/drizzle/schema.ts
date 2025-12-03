import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  author_id: varchar("author_id", { length: 36 }).notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const post_reactions = pgTable("post_reactions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  post_id: varchar("post_id", { length: 36 }).notNull(),
  user_id: varchar("user_id", { length: 36 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
});

export const post_comments = pgTable("post_comments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  post_id: varchar("post_id", { length: 36 }).notNull(),
  author_id: varchar("author_id", { length: 36 }).notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
