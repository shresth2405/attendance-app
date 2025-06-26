import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getClasses } from '../database/operation';
import ClassList from '../components/ClassList';
import { NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigationTypes';
import { Class } from '../database/types';

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const navigation = useNavigation<HomeNavigationProp>();

  const loadClasses = async () => {
    const result = await getClasses();
    setClasses(result.rows);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Add New Class"
        onPress={() => navigation.navigate('AddClass')}
      />
      <ClassList 
        classes={classes}
        onClassPress={(classId, className) => 
          navigation.navigate('Class', { classId, className })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;