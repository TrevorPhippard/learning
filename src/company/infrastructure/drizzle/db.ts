import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let pool: Pool | null = null;
let dbInstance: NodePgDatabase<typeof schema> | null = null;

function getDb(): NodePgDatabase<typeof schema> {
  if (!dbInstance) {
    const connectionString = process.env.COMPANY_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('COMPANY_DATABASE_URL or DATABASE_URL environment variable is required');
    }
    pool = new Pool({ connectionString });
    dbInstance = drizzle(pool, { schema });
  }
  return dbInstance;
}

export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop) {
    const db = getDb();
    const value = db[prop as keyof typeof db];
    return typeof value === 'function' ? value.bind(db) : value;
  }
});
