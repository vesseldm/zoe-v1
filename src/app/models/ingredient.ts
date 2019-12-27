import { Media } from './media';

export class Ingredient extends Media {
  id: string;
  name: string = '';
  description: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
