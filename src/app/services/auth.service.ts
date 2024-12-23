import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, map, throwError, Observable } from "rxjs";
import { AuthResponse } from "../login/auth.response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private tokenKey = 'authToken';

    private isLoggedInSubject: BehaviorSubject<boolean>;

    constructor(private httpClient: HttpClient, private router: Router) {
        const token = localStorage.getItem(this.tokenKey);
        this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
    }

    login(email: string, password: string): Observable<any> {
        console.log("email", email);
        console.log("password", password);
        
        return this.httpClient.post<AuthResponse>('http://localhost:8080/api/authenticate', { username: email, password })
            .pipe(
                map((response: any) => {
                    console.log(response);
                    this.setToken(response.jwt);
                    this.isLoggedInSubject.next(true);
                    return response;
                }),
                catchError((error) => {
                    console.error(error);
                    return throwError(error);
                })
            );
    }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/']);
    }
}
