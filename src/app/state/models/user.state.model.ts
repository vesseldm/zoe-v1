import { Ingredient } from './ingredients.state.model';
import * as Stripe from 'stripe';
export interface UserIngredientPreference {
    name: string;
    ingredientId: string;
    _id: string;
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
    currentPlan?: any; // Plan ID
    subscriptionType?: 'week' | 'annual' = 'annual';
    subscriptionId?: string;
    dietType?: string;
    isPreparedForYou?: boolean;
    controlPortionSize?: boolean;
    portionSize?: string;
    mealsToPrep?: string[] = [];
    password?: string;
    allergies?: Ingredient[];
    ingredients?: UserIngredientPreference[];
    recipes?: UserRecipe[];
    selectedRecipe?: UserRecipe;
    username: string;
    email: string;
    chosenRecipes: UserRecipe[];
    subscription: Stripe.subscriptions.ISubscription;
    customer: Stripe.customers.ICustomer;
  }

export interface UserRecipe {
    ingredients: RecipeIngredient[];
    name: string;
    _id: string;
    score: number;
    type: string;
    uid: string;
    thumbsUp: boolean;
    thumbsDown: boolean;
    photo: string;
    prepTime: string;
    cookTime: number;
    servingSize: string;
    description: string;
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
    instructions: string[];
  }

export interface RecipeIngredient {
      uid: string;
      displayName: string;
      amount: string;
      checked: boolean;
  }
