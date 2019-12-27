import { AngularFireStorageReference } from '@angular/fire/storage';

export class Media {
  photo: AngularFireStorageReference;
  video: AngularFireStorageReference;
  createdAt: Date = new Date();
}
