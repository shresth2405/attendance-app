import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getStudentsByClass } from '../database/operation';
import StudentList from '../components/StudentList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigationTypes';

import { RouteProp } from '@react-navigation/native';
import { Student } from '../database/types';

type ClassScreenRouteProp = RouteProp<RootStackParamList, 'Class'>;

type ClassScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Class'
>;

const ClassScreen = () => {
  const route = useRoute<ClassScreenRouteProp>();
  const navigation = useNavigation<ClassScreenNavigationProp>();
  const [students, setStudents] = useState<Student[]>([]);
  const { classId, className } = route.params;

  const loadStudents = async () => {
    const result = await getStudentsByClass(classId);
    setStudents(result.rows);
  };

  useEffect(() => {
    loadStudents();
  }, [classId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{className}</Text>
      <Button
        title="Add Student"
        onPress={() => navigation.navigate('AddStudent', { classId })}
      />
      <Button
        title="Take Attendance"
        onPress={() => navigation.navigate('Attendance', { classId, className })}
      />
      <StudentList students={students} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ClassScreen;