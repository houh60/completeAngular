import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    constructor(
        public name: string,
        public desciption: string,
        public imagePath: string,
        public ingredients: Ingredient[]
    ) {}
}
