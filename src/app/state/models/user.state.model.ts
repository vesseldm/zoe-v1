import { Ingredient } from './ingredients.state.model';
import { DocumentReference } from 'angularfire2/firestore';

export interface UserIngredientPreference {
    name: string;
    ingredientId: string;
    uid: string;
    score: number;
    liked: boolean;
    disliked: boolean;
    allergic: boolean;
    vegan: boolean;
    vegetarian: boolean;
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
    ingredientPreferences?: UserIngredientPreference[];
    recipes?: UserRecipe[];
    selectedRecipe?: UserRecipe;
  }

export interface UserRecipe {
    ingredients: string[];
    name: string;
    recipeId: string;
    score: number;
    type: string;
    uid: string;
    thumbsUp: boolean;
    thumbsDown: boolean;
  }
