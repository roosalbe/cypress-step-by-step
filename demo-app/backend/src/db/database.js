import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, '../data/db.json');

// Default data structure
const defaultData = {
  users: [],
  products: [],
  carts: [],
  orders: []
};

// Setup lowdb
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, defaultData);

// Initialize database
export async function initDb() {
  await db.read();
  db.data ||= defaultData;
  await db.write();
  return db;
}

export default db;
