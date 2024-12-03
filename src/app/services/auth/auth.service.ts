import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login,  Registration } from '../../utils/interfaces/auth.interface';
import { API_BASE_URL } from '../../utils/constants/api.bast';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoginDialogComponent } from '../../shared/login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers! : HttpHeaders;

  constructor() { 
    
  this.headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'X-Skip-JWT-Interceptor': 'true',
  });
  }

  httpClient = inject(HttpClient)
  dialog = inject(MatDialog)


  login(login : Login){
    return this.httpClient.post(`${API_BASE_URL}/auth/login`, login, {headers: this.headers});
  }

  register(register : Registration){
    return this.httpClient.post(`${API_BASE_URL}/users`, register, {headers: this.headers})
  }

  loginDialog(){
    this.dialog.open(LoginDialogComponent)
  }

  getUserData(){
    return this.httpClient.get(`${API_BASE_URL}/users/1`)
  }

}
