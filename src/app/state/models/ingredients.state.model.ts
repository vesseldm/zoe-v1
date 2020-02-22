
export interface Ingredient {
    name: string;
    uid: string;
    score: number;
    notAllowed: boolean;
    liked: boolean;
    disliked: boolean;
    checked?: boolean;
}

export interface IngredientsStateModel {
    ingredients: Ingredient[];
}
