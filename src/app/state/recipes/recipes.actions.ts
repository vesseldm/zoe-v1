export class RecipesAction {
  static readonly type = '[Recipes] Add item';
  constructor(public payload: string) { }
}

export class GetAllRecipes {
  static readonly type = '[Recipies] Get all recipes';
  constructor() { }
}
