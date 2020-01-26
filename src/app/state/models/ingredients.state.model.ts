
export interface Ingredient {
    name: string;
    uid: string;
    score: number;
    notAllowed: boolean;
    liked: boolean;
    disliked: boolean;
}

export interface IngredientsStateModel {
    ingredients: Ingredient[];
}
