import { Timestamp } from '@angular/fire/firestore';
import { User } from './user';

export class Course {
  name: string;
  description: string;
  owner: User;
  documents: object[];
  assessments: object[];
  enrolledStudents: User[];
  createdAt: Timestamp;
}
