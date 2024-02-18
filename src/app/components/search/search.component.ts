import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/apiServices/api.service';
import { SearchService } from 'src/app/services/searchServices/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  @Input() githubUsername: string = '';

  constructor(private apiService: ApiService, private searchService: SearchService) {
  }

  onGithubUsernameInputChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;
    this.githubUsername = event.target.value;
  }

  onSubmit() {
    if (this.githubUsername.length > 0) {
      this.search();
    } else {
      this.searchService.setSearchErrorMessageSubject("Please enter a username");
    }
  }

  search() {
    this.apiService.searchUser(this.githubUsername,1).subscribe({
      next: (searchResult: any) => {
        this.searchService.setGitHubUserSearchResultSubject(searchResult);
      },
      error: (error: any) => {
        console.log(error);
        this.searchService.setSearchErrorMessageSubject("Error in searching");
      }
    });
  }
}
