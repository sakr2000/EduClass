import { Course } from './course';

export class User {
  name: string;
  email: string;
  age: number;
  admin: boolean;
  myCourses?: Course[];
  id?: string;
  profilePhoto?: string;
}
