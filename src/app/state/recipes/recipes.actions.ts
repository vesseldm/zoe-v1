export class RecipesAction {
  static readonly type = '[Recipes] Add item';
  constructor(public payload: string) { }
}
