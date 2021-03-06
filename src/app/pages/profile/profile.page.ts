import { UserIngredientPreference, UserStateModel } from './../../state/models/user.state.model';
import { UserState } from './../../state/user/user.state';
import { Ingredient } from './../../state/models/ingredients.state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Store, Select } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { SaveProfileUserForm } from '../../state/user/user.actions';
import { Navigate } from '@ngxs/router-plugin';
import { takeUntil } from 'rxjs/operators';
import { Logout } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
  @Select(UserState.getIngredientPreferences) getIngredientPreferences$: Observable<UserIngredientPreference[]>;
  @Select(UserState.getUserState) getUserState$: Observable<UserStateModel>;
  public ngDestroyed$ = new Subject();
  public profileForm = this.formBuilder.group({
    details: this.formBuilder.group({
      email: ['', Validators.email],
      name: [''],
      measurements: [''],
      mobile: [''],
    }),
      aboutMe: this.formBuilder.group({
      height: [''],
      weight: [''],
      sex: [''],
      mealPlanType: [''],
      foodPreference: [''],
      allergies: [''],
      medicalHistory: [''],
    }),
    alerts: this.formBuilder.group({
      mealTimes: [''],
      mealReview: [''],
    }),
    emailPreferences: this.formBuilder.group({
      newsLetters: [''],
      updates: ['']
    }),
    billing: this.formBuilder.group({
      billName: [''],
      address_city: [''],
      address_line1: [''],
      address_line2: [''],
      address_state: [''],
      address_zip: ['']
    })
  });
  user: any;
  measurements: any;
  height: any;
  weight: any;
  sex: any;
  mealPlan: any;
  foodPreference: any;
  medicalHistory: any;
  mealTimes: any;
  ingredients: Ingredient[];
  allergies: UserIngredientPreference[];
  userState;

  constructor(
    public store: Store,
    public authService: AuthService,
    public userService: UserService,
    public formBuilder: FormBuilder,
  ) {
    this.height = [
      `4' 8"`,
      `4' 9"`,
      `4' 10"`,
      `4' 11"`,
      `5' 0"`,
      `5' 1"`,
      `5' 2"`,
      `5' 3"`,
      `5' 4"`,
      `5' 5"`,
      `5' 6"`,
      `5' 7"`,
      `5' 8"`,
      `5' 9"`,
      `5' 10"`,
      `5' 11"`,
      `6' 0"`,
      `6' 1"`,
      `6' 2"`,
      `6' 3"`,
      `6' 4"`,
      `6' 5"`,
      `6' 6"`,
      `6' 7"`,
      `6' 8"`,
      `6' 9"`,
      `6' 10"`,
      `6' 11"`,
      `7' 0"`
    ];
    this.measurements = ['Standard', 'Metrics'];
    this.weight = [
      '97 lbs',
      '98 lbs',
      '99 lbs',
      '100 lbs',
      '101 lbs',
      '102 lbs',
      '103 lbs',
      '104 lbs',
      '105 lbs',
      '106 lbs',
      '107 lbs',
      '108 lbs',
      '109 lbs',
      '110 lbs',
      '111 lbs',
      '112 lbs',
      '113 lbs',
      '114 lbs',
      '115 lbs',
      '116 lbs',
      '117 lbs',
      '118 lbs',
      '119 lbs',
      '120 lbs',
      '121 lbs',
      '122 lbs',
      '123 lbs',
      '124 lbs',
      '125 lbs',
      '126 lbs',
      '127 lbs',
      '128 lbs',
      '129 lbs',
      '130 lbs',
      '131 lbs',
      '132 lbs',
      '133 lbs',
      '134 lbs',
      '135 lbs',
      '136 lbs',
      '137 lbs',
      '138 lbs',
      '139 lbs',
      '140 lbs',
      '141 lbs',
      '142 lbs',
      '143 lbs',
      '144 lbs',
      '145 lbs',
      '146 lbs',
      '147 lbs',
      '148 lbs',
      '149 lbs',
      '150 lbs',
      '151 lbs',
      '152 lbs',
      '153 lbs',
      '154 lbs',
      '155 lbs',
      '156 lbs',
      '157 lbs',
      '158 lbs',
      '159 lbs',
      '160 lbs',
      '161 lbs',
      '162 lbs',
      '163 lbs',
      '164 lbs',
      '165 lbs',
      '166 lbs',
      '167 lbs',
      '168 lbs',
      '169 lbs',
      '170 lbs',
      '171 lbs',
      '172 lbs',
      '173 lbs',
      '174 lbs',
      '175 lbs',
      '176 lbs',
      '177 lbs',
      '178 lbs',
      '179 lbs',
      '180 lbs',
      '181 lbs',
      '182 lbs',
      '183 lbs',
      '184 lbs',
      '185 lbs',
      '186 lbs',
      '187 lbs',
      '188 lbs',
      '189 lbs',
      '190 lbs',
      '191 lbs',
      '192 lbs',
      '193 lbs',
      '194 lbs',
      '195 lbs',
      '196 lbs',
      '197 lbs',
      '198 lbs',
      '199 lbs',
      '200 lbs',
      '201 lbs',
      '202 lbs',
      '203 lbs',
      '204 lbs',
      '205 lbs',
      '206 lbs',
      '207 lbs',
      '208 lbs',
      '209 lbs',
      '210 lbs',
      '211 lbs',
      '212 lbs',
      '213 lbs',
      '214 lbs',
      '215 lbs',
      '216 lbs',
      '217 lbs',
      '218 lbs',
      '219 lbs',
      '220 lbs',
      '221 lbs',
      '222 lbs',
      '223 lbs',
      '224 lbs',
      '225 lbs',
      '226 lbs',
      '227 lbs',
      '228 lbs',
      '229 lbs',
      '230 lbs',
      '231 lbs',
      '232 lbs',
      '233 lbs',
      '234 lbs',
      '235 lbs',
      '236 lbs',
      '237 lbs',
      '238 lbs',
      '239 lbs',
      '240 lbs',
      '241 lbs',
      '242 lbs',
      '243 lbs',
      '244 lbs',
      '245 lbs',
      '246 lbs',
      '247 lbs',
      '248 lbs',
      '249 lbs',
      '250 lbs',
      '251 lbs',
      '252 lbs',
      '253 lbs',
      '254 lbs',
      '255 lbs',
      '256 lbs',
      '257 lbs',
      '258 lbs',
      '259 lbs',
      '260 lbs',
      '261 lbs',
      '262 lbs',
      '263 lbs',
      '264 lbs',
      '265 lbs',
      '266 lbs',
      '267 lbs',
      '268 lbs',
      '269 lbs',
      '270 lbs',
      '271 lbs',
      '272 lbs',
      '273 lbs',
      '274 lbs',
      '275 lbs',
      '276 lbs',
      '277 lbs',
      '278 lbs',
      '279 lbs',
      '280 lbs',
      '281 lbs',
      '282 lbs',
      '283 lbs',
      '284 lbs',
      '285 lbs',
      '286 lbs',
      '287 lbs',
      '288 lbs',
      '289 lbs',
      '290 lbs',
      '291 lbs',
      '292 lbs',
      '293 lbs',
      '294 lbs',
      '295 lbs',
      '296 lbs',
      '297 lbs',
      '298 lbs',
      '299 lbs',
      '300 lbs',
      '301 lbs',
      '302 lbs',
      '303 lbs',
      '304 lbs',
      '305 lbs',
      '306 lbs',
      '307 lbs',
      '308 lbs',
      '309 lbs',
      '310 lbs',
      '311 lbs',
      '312 lbs',
      '313 lbs',
      '314 lbs',
      '315 lbs',
      '316 lbs',
      '317 lbs',
      '318 lbs',
      '319 lbs',
      '320 lbs',
      '321 lbs',
      '322 lbs',
      '323 lbs',
      '324 lbs',
      '325 lbs',
      '326 lbs',
      '327 lbs',
      '328 lbs',
      '329 lbs',
      '330 lbs',
      '331 lbs',
      '332 lbs',
      '333 lbs',
      '334 lbs',
      '335 lbs',
      '336 lbs',
      '337 lbs',
      '338 lbs',
      '339 lbs',
      '340 lbs',
      '341 lbs',
      '342 lbs',
      '343 lbs',
      '344 lbs',
      '345 lbs',
      '346 lbs',
      '347 lbs',
      '348 lbs',
      '349 lbs',
      '350 lbs',
      '351 lbs',
      '352 lbs',
      '353 lbs',
      '354 lbs',
      '355 lbs',
      '356 lbs',
      '357 lbs',
      '358 lbs',
      '359 lbs',
      '360 lbs',
      '361 lbs',
      '362 lbs',
      '363 lbs',
      '364 lbs',
      '365 lbs',
      '366 lbs',
      '367 lbs',
      '368 lbs',
      '369 lbs',
      '370 lbs',
      '371 lbs',
      '372 lbs',
      '373 lbs',
      '374 lbs',
      '375 lbs',
      '376 lbs',
      '377 lbs',
      '378 lbs',
      '379 lbs',
      '380 lbs',
      '381 lbs',
      '382 lbs',
      '383 lbs',
      '384 lbs',
      '385 lbs',
      '386 lbs',
      '387 lbs',
      '388 lbs',
      '389 lbs',
      '390 lbs',
      '391 lbs',
      '392 lbs',
      '393 lbs',
      '394 lbs',
      '395 lbs',
      '396 lbs'
    ];
    this.sex = ['Male', 'Female'];
    this.mealPlan = ['Regular', 'Normal'];
    this.medicalHistory = ['History1', 'History2', 'History3'];
    this.mealTimes = ['6: 00 AM', '7: 00 AM', '8: 00 AM', '9: 00 AM', '10: 00 AM', '11: 00 AM', '12: 00 PM', '1: 00 PM',
    '2: 00 PM', '3: 00 PM', '4: 00 PM', '5: 00 PM', '6: 00 PM', '7: 00 PM', '8: 00 PM', '9: 00 PM', '10: 00 PM'];
  }

  ngOnInit() {
    this.getIngredientPreferences$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      console.log('getIngredientPreferences data = ');
      console.log(data);
      this.allergies = data;
    });
    this.getUserState$
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe(data => {
      this.userState = data;
    });
    if (this.userState) {
      this.setFormData(this.userState);
    }
  }

  setFormData(userState: UserStateModel) {
    if (userState.email) {
      this.profileForm.patchValue({details: {email: userState.email}});

    }
  }

  onSubmit() {
    this.store.dispatch(new SaveProfileUserForm());
  }

  logout() {
    this.store.dispatch(new Navigate(['']));
    this.store.dispatch(new Logout());
  }

  goToFoodPreferences() {
    this.store.dispatch(new Navigate(['/food-preferences']));
  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
  }
}
