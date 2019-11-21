import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyweekPage } from './myweek.page';

describe('MyweekPage', () => {
  let component: MyweekPage;
  let fixture: ComponentFixture<MyweekPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyweekPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyweekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
