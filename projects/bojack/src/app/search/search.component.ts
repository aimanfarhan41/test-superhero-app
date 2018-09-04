import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Hero } from '../hero';
import { SuperheroService } from '../../../../../src/app/superhero.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
	errorMessage: String = "";

    heroes$: Observable<Hero[]>;
  	listOfHeroes$ : Hero[];
	private searchTerms = new Subject<string>();
	constructor(private heroService: SuperheroService) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

	 
	  ngOnInit(): void {
	  	this.heroes$ = this.searchTerms.pipe(
	        debounceTime(100),
	      	// ignore new term if same as previous term
	      	distinctUntilChanged(),
	      	// switch to new search observable each time the term changes
	     	switchMap((term: string) => this.heroService.searchHeroes(term)),
	    );
  		this.heroService.getListOfHeroes()
      		.subscribe((heroes: Hero[]) => {
            	this.listOfHeroes$ = heroes;
        	})


	}
}
