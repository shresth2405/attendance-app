export interface Class {
  id?: number;
  name: string;
  createdAt?: string;
}

export interface Student {
  id?: number;
  name: string;
  classId: number;
  createdAt?: string;
}

export interface AttendanceRecord {
  id?: number;
  classId: number;
  studentId: number;
  date: string;
  status: 'present' | 'absent';
  createdAt?: string;
}

export interface SQLiteRunResult {
  lastInsertRowId: number;
  changes: number;
}

export interface SQLiteQueryResult<T = any> {
  rows: T[];
  count: number;
}