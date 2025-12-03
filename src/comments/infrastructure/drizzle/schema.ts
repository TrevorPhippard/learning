import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  post_id: varchar("post_id", { length: 36 }).notNull(),
  author_id: varchar("author_id", { length: 36 }).notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
