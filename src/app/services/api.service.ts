import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Login } from '../models/api.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Config } from '../app.config';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private conf = Config.getInstance('config.json');

    // Define API
    apiURL = this.conf.get('apiUrl');

    constructor(private http: HttpClient) { }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // HttpClient API get() method => Fetch Logins list
    getLogins(): Observable<Login[]> {
        let params = new HttpParams().set('_sort', 'timestamp')
                                     .set('_order', 'desc');
        let options = {params: params};
        Object.assign(options, this.httpOptions);
        return this.http.get<Login[]>(this.apiURL + '/logins', options)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API get() method => Fetch Login
    getLogin(id: number): Observable<Login> {
        return this.http.get<Login>(this.apiURL + '/logins/' + id)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API post() method => Create Login
    createLogin(login: Login): Observable<Login> {
        return this.http.post<Login>(this.apiURL + '/logins', JSON.stringify(login), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API put() method => Update Login
    updateLogin(id: number, login: Login): Observable<Login> {
        return this.http.put<Login>(this.apiURL + '/logins/' + id, JSON.stringify(login), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API delete() method => Delete Login
    deleteLogin(id: number){
        return this.http.delete<Login>(this.apiURL + '/logins/' + id, this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
            console.error(error.error);
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.error(error);
        }
        return throwError(errorMessage);
    }
}