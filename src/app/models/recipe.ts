import { Media } from './media';

export class Recipe extends Media {
  id: string;
  ref: any;
  uid: string;
  name: string = '';
  description: string = '';
  author: string = '';
  cookTimeMin: number;
  prepTimeMin: number;
  type: string;
  difficulty: number;
  servings: number;
  portions: any[];
  publicTags: string[];
  privateTags: string[];
  approvedAt?: Date;
}
