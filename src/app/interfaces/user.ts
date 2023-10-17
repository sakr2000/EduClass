export interface User {
  name: string;
  email: string;
  age: number;
  admin: boolean;
  myCourses?: Array<object>;
}
