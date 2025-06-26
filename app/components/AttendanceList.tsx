import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AttendanceRecord } from '../database/types';

interface AttendanceListProps {
  records: AttendanceRecord[];
  studentNames?: Record<number, string>;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ records, studentNames }) => {
  return (
    <FlatList
      data={records}
      keyExtractor={item => `${item.id}-${item.date}`}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={[
          styles.item,
          item.status === 'present' ? styles.present : styles.absent
        ]}>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          {studentNames && (
            <Text style={styles.student}>
              {studentNames[item.studentId] || `Student ${item.studentId}`}
            </Text>
          )}
          <Text style={styles.status}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No attendance records found</Text>
      }
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
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  present: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  absent: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  date: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  student: {
    fontSize: 16,
    fontWeight: '500',
    flex: 2,
    paddingHorizontal: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default AttendanceList;