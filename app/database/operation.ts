import * as SQLite from 'expo-sqlite';
import { 
  Class, 
  Student, 
  AttendanceRecord,
  SQLiteRunResult,
  SQLiteQueryResult 
} from './types';

const db = SQLite.openDatabaseAsync('attendance.db');

// Generic Operations
const executeWrite = async (sql: string, params: any[] = []): Promise<SQLiteRunResult> => {
  const database = await db;
  return await database.runAsync(sql, params);
};

const executeQuery = async <T = any>(sql: string, params: any[] = []): Promise<SQLiteQueryResult<T>> => {
  const database = await db;
  const rows = await database.getAllAsync<T>(sql, params);
  return { rows, count: rows.length };
};

// Class Operations
export const addClass = async (name: string): Promise<SQLiteRunResult> => {
  return executeWrite(
    'INSERT INTO classes (name) VALUES (?)', 
    [name]
  );
};

export const getClasses = async (): Promise<SQLiteQueryResult<Class>> => {
  return executeQuery<Class>('SELECT * FROM classes ORDER BY name');
};

// Student Operations
export const addStudent = async (name: string, classId: number): Promise<SQLiteRunResult> => {
  return executeWrite(
    'INSERT INTO students (name, classId) VALUES (?, ?)',
    [name, classId]
  );
};

export const getStudentsByClass = async (classId: number): Promise<SQLiteQueryResult<Student>> => {
  return executeQuery<Student>(
    'SELECT * FROM students WHERE classId = ? ORDER BY name',
    [classId]
  );
};

// Attendance Operations
export const markAttendance = async (record: Omit<AttendanceRecord, 'id' | 'createdAt'>): Promise<SQLiteRunResult> => {
  return executeWrite(
    `INSERT INTO attendance (classId, studentId, date, status)
     VALUES (?, ?, ?, ?)`,
    [record.classId, record.studentId, record.date, record.status]
  );
};

export const getClassAttendance = async (classId: number, date?: string): Promise<SQLiteQueryResult<AttendanceRecord>> => {
  if (date) {
    return executeQuery<AttendanceRecord>(
      `SELECT * FROM attendance 
       WHERE classId = ? AND date = ?`,
      [classId, date]
    );
  }
  return executeQuery<AttendanceRecord>(
    `SELECT * FROM attendance 
     WHERE classId = ? 
     ORDER BY date DESC`,
    [classId]
  );
};