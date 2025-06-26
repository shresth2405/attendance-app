import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import HomeScreen from '../screens/HomeScreen';
import ClassScreen from '../screens/ClassScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import AddClassScreen from '../screens/AddClassScreen';
import AddStudentScreen from '../screens/AddStudentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen 
      name="Class" 
      component={ClassScreen} 
      options={({ route }) => ({ title: route.params.className || 'Class' })}
    />
    <Stack.Screen name="Attendance" component={AttendanceScreen} />
    <Stack.Screen name="AddClass" component={AddClassScreen} />
    <Stack.Screen name="AddStudent" component={AddStudentScreen} />
  </Stack.Navigator>
);