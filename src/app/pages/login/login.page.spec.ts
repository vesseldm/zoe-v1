import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from './login.page';
import { of as observableOf} from 'rxjs';


fdescribe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: string => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const authServiceStub = () => ({
      login: value => ({ then: () => ({}) }),
      doFacebookLogin: () => ({ then: () => ({}) }),
      doGoogleLogin: () => ({ then: () => ({}) }),
      doTwitterLogin: () => ({ then: () => ({}) })
    });
    const angularFireAuthStub = () => ({ user: { subscribe: () => ({user: {id: '324'}}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginPage],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: AuthService, useFactory: authServiceStub },
      ]
    });
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    fit('makes expected calls', () => {
       // An anonymous user
  const authState = {
    displayName: null,
    isAnonymous: true,
    uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
  };


      spyOn(component, 'goHome').and.callThrough();
      // spyOn(component, 'generateForm').and.callThrough();
      component.ngOnInit();
      expect(component.goHome).toHaveBeenCalled();
      // expect(component.generateForm).toHaveBeenCalled();
    });
  });
  describe('generateForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.generateForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('goSignup', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.goSignup();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });
  describe('goForgot', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.goForgot();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });
  describe('goHome', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.goHome();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });
  describe('tryFacebookLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(authServiceStub, 'doFacebookLogin').and.callThrough();
      component.tryFacebookLogin();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(authServiceStub.doFacebookLogin).toHaveBeenCalled();
    });
  });
  describe('tryGoogleLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(authServiceStub, 'doGoogleLogin').and.callThrough();
      component.tryGoogleLogin();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(authServiceStub.doGoogleLogin).toHaveBeenCalled();
    });
  });
  describe('tryTwitterLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(authServiceStub, 'doTwitterLogin').and.callThrough();
      component.tryTwitterLogin();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(authServiceStub.doTwitterLogin).toHaveBeenCalled();
    });
  });
});
