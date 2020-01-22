import { DocumentReference } from 'angularfire2/firestore';

export class UserStateModel {
    uid: string;
    email: string;
    photoURL?: string;
    type?: 'user' | 'author' | 'admin' = 'user';
    gender?: 'female' | 'male';
    age?: number;
    tall?: number;
    goal?: string;
    level?: string;
    weight?: number;
    currentPlan?: DocumentReference; // Plan ID
    subscriptionType?: 'week' | 'annual' = 'annual';
    subscriptionId?: string;
    dietType?: string;
    isPreparedForYou?: boolean;
    controlPortionSize?: boolean;
    portionSize?: string;
    mealsToPrep?: string[] = [];
    password?: string;
    name?: string;
  }
