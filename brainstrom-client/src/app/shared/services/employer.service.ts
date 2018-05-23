import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Employer } from '../models/employer.model';

@Injectable()
export class EmployerService {
  readonly rootUrl = 'http://localhost:35257';
  constructor(private http: HttpClient) { }

  addEmployer(employer: Employer) {
    const body: Employer = {      
      firstName: employer.firstName,
      lastName: employer.lastName,
      gender: employer.gender,
      dateOfBirth: employer.dateOfBirth
    }
    return this.http.post(this.rootUrl + '/api/employer/Register', body);
  }

  //userAuthentication(userName, password) {
  //  var data = "username=" + userName + "&password=" + password + "&grant_type=password";
  //  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
  //  return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  //}

  //getUserClaims(){
  // return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  //}

}
