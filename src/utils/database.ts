import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('petvet.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        breed TEXT,
        age_years INTEGER DEFAULT 0,
        age_months INTEGER DEFAULT 0,
        weight REAL,
        photo_uri TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS checks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pet_id INTEGER NOT NULL,
        photo_uri TEXT,
        symptoms TEXT,
        ai_result TEXT,
        urgency TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (pet_id) REFERENCES pets(id)
      );
      CREATE TABLE IF NOT EXISTS vaccinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pet_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        next_date TEXT,
        notes TEXT,
        FOREIGN KEY (pet_id) REFERENCES pets(id)
      );
      CREATE TABLE IF NOT EXISTS weight_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pet_id INTEGER NOT NULL,
        weight REAL NOT NULL,
        date TEXT DEFAULT (date('now')),
        FOREIGN KEY (pet_id) REFERENCES pets(id)
      );
    `);
  }
  return db;
}

export interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string | null;
  age_years: number;
  age_months: number;
  weight: number | null;
  photo_uri: string | null;
  created_at: string;
}

export interface HealthCheck {
  id: number;
  pet_id: number;
  photo_uri: string | null;
  symptoms: string;
  ai_result: string;
  urgency: string;
  created_at: string;
}

export async function addPet(
  name: string, type: string, breed: string,
  ageYears: number, ageMonths: number, weight: number | null
): Promise<number> {
  const database = await getDb();
  const result = await database.runAsync(
    'INSERT INTO pets (name, type, breed, age_years, age_months, weight) VALUES (?, ?, ?, ?, ?, ?)',
    name, type, breed, ageYears, ageMonths, weight
  );
  return result.lastInsertRowId;
}

export async function getPets(): Promise<Pet[]> {
  const database = await getDb();
  return await database.getAllAsync<Pet>('SELECT * FROM pets ORDER BY created_at DESC');
}

export async function getPetById(id: number): Promise<Pet | null> {
  const database = await getDb();
  return await database.getFirstAsync<Pet>('SELECT * FROM pets WHERE id = ?', id);
}

export async function deletePet(id: number): Promise<void> {
  const database = await getDb();
  await database.runAsync('DELETE FROM checks WHERE pet_id = ?', id);
  await database.runAsync('DELETE FROM vaccinations WHERE pet_id = ?', id);
  await database.runAsync('DELETE FROM weight_log WHERE pet_id = ?', id);
  await database.runAsync('DELETE FROM pets WHERE id = ?', id);
}

export async function addHealthCheck(
  petId: number, photoUri: string | null,
  symptoms: string, aiResult: string, urgency: string
): Promise<number> {
  const database = await getDb();
  const result = await database.runAsync(
    'INSERT INTO checks (pet_id, photo_uri, symptoms, ai_result, urgency) VALUES (?, ?, ?, ?, ?)',
    petId, photoUri, symptoms, aiResult, urgency
  );
  return result.lastInsertRowId;
}

export async function getHealthChecks(petId: number): Promise<HealthCheck[]> {
  const database = await getDb();
  return await database.getAllAsync<HealthCheck>(
    'SELECT * FROM checks WHERE pet_id = ? ORDER BY created_at DESC', petId
  );
}

export async function getAllHealthChecks(): Promise<(HealthCheck & { pet_name: string })[]> {
  const database = await getDb();
  return await database.getAllAsync<HealthCheck & { pet_name: string }>(
    `SELECT c.*, p.name as pet_name FROM checks c
     JOIN pets p ON c.pet_id = p.id
     ORDER BY c.created_at DESC LIMIT 50`
  );
}
