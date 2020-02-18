
export class Plan {
  id: string;
  name: string;
  breakfasts: MealPlan[]; // ids to recipes
  mains: MealPlan[]; // ids to recipes
  snacks: MealPlan[]; // ids to recipes
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date; // Date user completed plan
  uid: string;
  mealsToPrep: string[];
  portionSize: string;
  dietType: string;
}

export class MealPlan {
  recipe: any;
  portion: any;
  servings: number;
  completedAt: Date; // Date user completed the recipe
  currentStep: number; // User's current step while cooking (progress)
}
