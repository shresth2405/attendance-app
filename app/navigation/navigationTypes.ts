export type RootStackParamList = {
  Home: undefined;
  Class: { classId: number; className?: string };
  Attendance: { classId: number; className?: string };
  AddClass: undefined;
  AddStudent: { classId: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}