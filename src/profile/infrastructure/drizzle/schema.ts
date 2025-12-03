import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  user_account_id: varchar('user_account_id', { length: 36 }).notNull(),
  full_name: text('full_name').notNull(),
  headline: text('headline'),
  summary: text('summary'),
  profile_image: text('profile_image'),
  banner_image: text('banner_image'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const skills = pgTable('skills', {
  id: varchar('id', { length: 36 }).primaryKey(),
  profile_id: varchar('profile_id', { length: 36 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  endorsements: varchar('endorsements').default('0').notNull(), // stored as string for simplicity
});

export const experiences = pgTable('experiences', {
  id: varchar('id', { length: 36 }).primaryKey(),
  profile_id: varchar('profile_id', { length: 36 }).notNull(),
  company_name: text('company_name').notNull(),
  title: text('title').notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date'),
  description: text('description'),
  ord: varchar('ord').default('0').notNull(),
});
