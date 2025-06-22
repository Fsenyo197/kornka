import { openDB } from 'idb';

const DB_NAME = 'authDB';
const STORE_NAME = 'tokens';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveToken = async (key: string, token: string) => {
  const db = await initDB();
  await db.put(STORE_NAME, token, key);
};

export const getToken = async (key: string): Promise<string | null> => {
  const db = await initDB();
  return await db.get(STORE_NAME, key);
};

export const deleteToken = async (key: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, key);
};
