import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  docData,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  activeUser: any;
  constructor(private firestore: Firestore, private afs: AngularFirestore) {}

  // read collection data
  readAllData(collectionPath: string) {
    let pathRef = collection(this.firestore, collectionPath);
    return collectionData(pathRef, { idField: 'id' });
  }

  getAllDataById(collectionPath: string, id: string) {
    const collectionRef = this.afs.collection(collectionPath, (ref) =>
      ref.where('course', '==', id)
    );
    return collectionRef.valueChanges();
  }

  // Add Data
  addData(collectionPath: string, data: any) {
    let pathRef = collection(this.firestore, collectionPath);
    return addDoc(pathRef, data);
  }

  // get Data with id
  getDocument(collectionPath: string, id: string) {
    let pathRef = doc(this.firestore, `${collectionPath}/${id}`);
    return docData(pathRef);
  }

  getUserByEmail(email: string) {
    let pathRef = this.afs.collection('users', (ref) =>
      ref.where('email', '==', email)
    );
    return pathRef.snapshotChanges();
  }

  // Update Data
  updateData(collectionPath: string, id: string, data: any) {
    let pathRef = doc(this.firestore, `${collectionPath}/${id}`);
    return setDoc(pathRef, data);
  }

  // add new field
  addField(collectionPath: string, id: string, data: any) {
    let pathRef = doc(this.firestore, `${collectionPath}/${id}`);
    return updateDoc(pathRef, data);
  }

  // Delete Data
  deleteData(id: string, collectionPath: string) {
    let pathRef = doc(this.firestore, `${collectionPath}/${id}`);
    return deleteDoc(pathRef);
  }
}
