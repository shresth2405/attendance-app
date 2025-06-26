import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { addStudent } from '../database/operation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigationTypes';
import { RouteProp } from '@react-navigation/native';

type AddStudentScreenRouteProp = RouteProp<RootStackParamList, 'AddStudent'>;
type AddStudentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddStudent'>;

const AddStudentScreen = () => {
  const route = useRoute<AddStudentScreenRouteProp>();
  const navigation = useNavigation<AddStudentScreenNavigationProp>();
  const [studentName, setStudentName] = useState('');
  const { classId } = route.params;

  const handleSubmit = async () => {
    if (!studentName.trim()) {
      Alert.alert('Error', 'Please enter a student name');
      return;
    }

    try {
      await addStudent(studentName, classId);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add student');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
        autoFocus
      />
      <Button title="Add Student" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddStudentScreen;