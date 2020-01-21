import { DocumentReference } from '@angular/fire/firestore';

export class User {
  uid: string;
  email: string;
  photoURL: string;
  type: 'user' | 'author' | 'admin' = 'user';
  gender: 'female' | 'male';
  age = 25;
  tall = 150;
  goal: string;
  level: string;
  weight: number;
  currentPlan?: DocumentReference; // Plan ID
  subscriptionType: 'week' | 'annual' = 'annual';
  subscriptionId?: string;
  dietType: string;
  isPreparedForYou = true;
  controlPortionSize = true;
  portionSize: string;
  mealsToPrep?: string[] = [];
  password: string;
  name: string;
}
