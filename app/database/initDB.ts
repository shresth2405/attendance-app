import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('attendance.db');

export const initDB = async (): Promise<void> => {
  try {
    const database = await db;
    
    await database.execAsync(`
      PRAGMA foreign_keys = ON;
      
      CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        createdAt TEXT DEFAULT (datetime('now','localtime'))
      );
      
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        classId INTEGER NOT NULL,
        createdAt TEXT DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (classId) REFERENCES classes (id) ON DELETE CASCADE
      );
      
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        classId INTEGER NOT NULL,
        studentId INTEGER NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (classId) REFERENCES classes (id),
        FOREIGN KEY (studentId) REFERENCES students (id)
      );
    `);
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

export default db;