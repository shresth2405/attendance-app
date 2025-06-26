import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Class } from '../database/types';

interface ClassListProps {
  classes: Class[];
  onClassPress: (classId: number, className: string) => void;
}

const ClassList: React.FC<ClassListProps> = ({ classes, onClassPress }) => {
  return (
    <FlatList
      data={classes}
      keyExtractor={item => item.id?.toString() || ''}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => onClassPress(item.id!, item.name)}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {new Date(item.createdAt || '').toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ClassList;