import { DocumentReference } from '@angular/fire/firestore';
import { Media } from './media';

export class Recipe extends Media {
  id: string;
  ref: DocumentReference;
  uid: string;
  name: string = '';
  description: string = '';
  author: string = '';
  cookTimeMin: number;
  prepTimeMin: number;
  type: string;
  difficulty: number;
  servings: number;
  portions: DocumentReference[];
  publicTags: string[];
  privateTags: string[];
  approvedAt?: Date;
}
