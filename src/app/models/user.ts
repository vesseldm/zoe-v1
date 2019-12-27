import { DocumentReference } from '@angular/fire/firestore';

export class User {
  uid: string;
  firstName: string;
  surname: string;
  email: string;
  photoURL: string;
  type: 'user' | 'author' | 'admin' = 'user';
  gender: 'female' | 'male';
  age: number = 25;
  tall: number = 150;
  goal: string;
  level: string;
  weight: number;
  currentPlan?: DocumentReference; // Plan ID
  subscriptionType: 'week' | 'annual' = 'annual';
  subscriptionId?: string;
  dietType: string;
  isPreparedForYou: boolean = true;
  controlPortionSize: boolean = true;
  portionSize: string;
  mealsToPrep?: string[] = [];
}
