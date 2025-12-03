import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  author_id: varchar("author_id", { length: 36 }).notNull(),
  company_id: varchar("company_id", { length: 36 }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
