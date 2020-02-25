import { UserStateModel } from '../state/models/user.state.model';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public url: string;
  constructor(
    public platform: Platform,
    private httpClient: HttpClient
  ) {
    this.url = environment.apiUrl;

  }

  public registerUser(value) {
    return this.httpClient.post<any>(
      this.url + '/auth/register',
      {
        username: value.email,
        password: value.password,
        email: value.email
      });
  }

  login(value): Observable<any> {
    return this.httpClient.post(
      this.url + '/auth/login',
      {
        username: value.email,
        password: value.password,
      });
  }

}
