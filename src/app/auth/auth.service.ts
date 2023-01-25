import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { AuthData } from './auth.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private httpClient: HttpClient, private router: Router) {}

    createUser(username: string, email: string, phone: number , password: string) {
        const authData: AuthData = {username: username, email: email, phone: phone, password: password};
        this.httpClient.post('http://localhost:3000/api/user/signup', authData).subscribe((responseData)=> {
            console.log(responseData);
            
        })
    }
}