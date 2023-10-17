import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  // read data
  readData() {
    let pathRef = collection(this.firestore, 'users');
    return collectionData(pathRef, { idField: 'id' });
  }

  // Add Data
  addData(collectionPath: string, data: any): Promise<any> {
    let pathRef = collection(this.firestore, collectionPath);
    return addDoc(pathRef, data);
  }

  // Update Data
  updateData(id: string, data: any, collection: string) {}

  // Delete Data
  deleteData(id: string, collection: string) {}
}
