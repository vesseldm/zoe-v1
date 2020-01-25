import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodPreferencesPage } from './food-preferences.page';

describe('FoodPreferencesPage', () => {
  let component: FoodPreferencesPage;
  let fixture: ComponentFixture<FoodPreferencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPreferencesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodPreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
