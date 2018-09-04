import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';  
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../../projects/bojack/src/app/hero'
import { environment } from '../environments/environment'; 
import { APP_BASE_HREF } from '@angular/common';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 

@Injectable({
  providedIn: 'root'
})

export class SuperheroService {

    constructor(private http: HttpClient) {}

    searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
	    	// if not search term, return empty hero array.
	    	return of([]);
	  	}
	  	return this.http.get<Hero[]>(`${environment.apiUrl}${environment.apiKey}/search/`+term).pipe(
            map((response: any) => {
            	if(response && response.response =="success"){
            		return response.results;
            	}
            	else{
            		return [];
            	}
                
            }));
	}
    getListOfHeroes(): Observable<Hero[]> {
	  	return this.http.get<Hero[]>(`${environment.apiUrl}${environment.apiKey}/search/bat`).pipe(
            map((response: any) => {
            	if(response && response.response =="success"){

            		return response.results;
            	}
            	else{
            		return [];
            	}
                
            }));
	}


}
