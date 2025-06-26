import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getStudentsByClass, markAttendance } from '../database/operation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigationTypes';
import { Student } from '../database/types';
import { RouteProp } from '@react-navigation/native';

type AttendanceScreenRouteProp = RouteProp<RootStackParamList, 'Attendance'>;
type AttendanceScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Attendance'>;

const AttendanceScreen = () => {
  const route = useRoute<AttendanceScreenRouteProp>();
  const navigation = useNavigation<AttendanceScreenNavigationProp>();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, 'present' | 'absent'>>({});
  const { classId, className } = route.params;
  const currentDate = new Date().toISOString().split('T')[0];

  const loadStudents = async () => {
    const result = await getStudentsByClass(classId);
    setStudents(result.rows);
    const initialStatus: Record<number, 'present' | 'absent'> = {};
    result.rows.forEach(student => {
      if (student.id) initialStatus[student.id] = 'present';
    });
    setAttendanceStatus(initialStatus);
  };

  useEffect(() => {
    loadStudents();
  }, [classId]);

  const toggleStatus = (studentId: number) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }));
  };

  const submitAttendance = async () => {
    try {
      for (const student of students) {
        if (student.id) {
          await markAttendance({
            classId,
            studentId: student.id,
            date: currentDate,
            status: attendanceStatus[student.id]
          });
        }
      }
      Alert.alert('Success', 'Attendance recorded successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save attendance');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{className || 'Class Attendance'}</Text>
      <Text style={styles.date}>Date: {currentDate}</Text>
      
      <FlatList
        data={students}
        keyExtractor={item => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.studentItem,
              attendanceStatus[item.id!] === 'absent' && styles.absent
            ]}
            onPress={() => item.id && toggleStatus(item.id)}
          >
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.status}>
              {attendanceStatus[item.id!]?.toUpperCase() || 'PRESENT'}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitAttendance}>
        <Text style={styles.submitText}>SUBMIT ATTENDANCE</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  absent: {
    backgroundColor: '#ffebee',
  },
  studentName: {
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AttendanceScreen;