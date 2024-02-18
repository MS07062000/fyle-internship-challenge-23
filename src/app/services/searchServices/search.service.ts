import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService{
  private gitHubUserSearchResultSubject = new BehaviorSubject<any>(null);
  gitHubUserSearch$ = this.gitHubUserSearchResultSubject.asObservable();

  private searchErrorMessageSubject = new Subject<string>();
  searchErrorMessage$ = this.searchErrorMessageSubject.asObservable();
  
  constructor() { }

  setGitHubUserSearchResultSubject(data: any) {
    this.gitHubUserSearchResultSubject.next(data);
  }

  setSearchErrorMessageSubject(error:string){
    this.searchErrorMessageSubject.next(error);
  }
  
}
