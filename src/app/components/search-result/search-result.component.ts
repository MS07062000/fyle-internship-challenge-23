import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/searchServices/search.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})

export class SearchResultComponent {
  private subscriptions: Subscription[] = [];
  searchResult: any = null; // Variable to store the search result
  errorMessage: string | null = null; // Variable to store error message, if any

  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ngOnInit() {
    // Subscribe to search data changes in the shared service
    const gitHubUserSearchSubscription= this.searchService.gitHubUserSearch$.subscribe(data => {
      this.searchResult = data;
      this.errorMessage = null; // Clear any previous error message
    });

    // Subscribe to error messages in the shared service
    const searchErrorMessageSubscription=this.searchService.searchErrorMessage$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });

    this.subscriptions.push(gitHubUserSearchSubscription, searchErrorMessageSubscription)
  }

  navigateWithQueryParams(githubUserName: string) {
    // Navigate to the route with query parameters
    this.router.navigate(['user'], { queryParams: { username: githubUserName } });
  }

}
