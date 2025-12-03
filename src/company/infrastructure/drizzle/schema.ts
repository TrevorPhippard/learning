import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  website: varchar('website', { length: 255 }),
  industry: varchar('industry', { length: 255 }),
  location: varchar('location', { length: 255 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});
