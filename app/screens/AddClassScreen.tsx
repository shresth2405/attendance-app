import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addClass } from '../database/operation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigationTypes';

type AddClassNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddClass'
>;

const AddClassScreen = () => {
  const [className, setClassName] = useState('');
  const navigation = useNavigation<AddClassNavigationProp>();

  const handleSubmit = async () => {
    if (!className.trim()) {
      Alert.alert('Error', 'Please enter a class name');
      return;
    }

    try {
      await addClass(className);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add class');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Class Name"
        value={className}
        onChangeText={setClassName}
        autoFocus
      />
      <Button title="Add Class" onPress={handleSubmit} />
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

export default AddClassScreen;