import { DocumentReference } from 'angularfire2/firestore';

export interface Ingredient {
    name: string;
    uid: string;
}

export interface ProfileFormModel {
        model: {
            details?: {
                email?: string;
                name?: string;
                measurements?: string;
                mobile?: string;
            };
            aboutMe?: {
                height?: string;
                weight?: string;
                sex?: string;
                mealPlanType?: string;
                foodPreference?: string;
                allergies?: string;
                medicalHistory?: string;
            }
            alerts?: {
                mealTimes?: string;
                mealReview?: string;
            }
            emailPreferences?: {
                newsLetters?: string;
                updates?: string;
            }
        };
        dirty?: boolean;
        status?: string;
        errors?: object;
}

export class UserStateModel {
    profileForm?: ProfileFormModel;
    uid: string;
    photoURL?: string;
    type?: 'user' | 'author' | 'admin' = 'user';
    age?: number;
    goal?: string;
    level?: string;
    currentPlan?: DocumentReference; // Plan ID
    subscriptionType?: 'week' | 'annual' = 'annual';
    subscriptionId?: string;
    dietType?: string;
    isPreparedForYou?: boolean;
    controlPortionSize?: boolean;
    portionSize?: string;
    mealsToPrep?: string[] = [];
    password?: string;
    allergies?: Ingredient[];
  }
