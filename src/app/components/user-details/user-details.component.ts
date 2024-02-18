import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/apiServices/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/userInfo';
import { RepoInfo } from 'src/app/interfaces/repoInfo';
import { RepoService } from 'src/app/services/repoServices/repo.service';
import { Observable, Subscription, catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {
  private subscriptions: Subscription[] = [];
  @Input() githubUserName!: string;
  userInfo!: UserInfo;
  userRepos!: RepoInfo[];
  currentPage: number = 1;
  totalPages: number = 1;
  errorMessage: string | null = null;

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  constructor(private apiService: ApiService, private repoService: RepoService, private route: ActivatedRoute) {
    const queryParamsSubscription = this.route.queryParams.subscribe(async (params) => {
      this.githubUserName = params['username'];
      this.getUserInfo();
      this.getRepos(this.currentPage);
      sessionStorage.clear();
    });

    const currentPageSubscription = this.repoService.currentPage$.subscribe({
      next: (pageNumber: number) => {
        this.getRepos(pageNumber);
      }
    })

    this.subscriptions.push(queryParamsSubscription, currentPageSubscription);
  }

  getUserInfo() {
    const userInfoSubscription = this.apiService.getUserInfo(this.githubUserName).subscribe(
      {
        next: (userInfo: UserInfo) => {
          this.userInfo = userInfo;
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = 'Error fetching user details';
          console.error('Error fetching user details:', error);
        }
      }
    );
    this.subscriptions.push(userInfoSubscription);
  }

  getRepos(pageNumber: number) {
    const cachedData = sessionStorage.getItem(`${this.githubUserName}_page${pageNumber}`);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      this.userRepos = parsedData;
      this.errorMessage = null;
    } else {
      const userReposSubscription = this.apiService.getUserRepos(this.githubUserName, pageNumber).subscribe(
        {
          next: (reposResponse: any) => {
            this.userRepos = reposResponse.repos;
            if (pageNumber === 1) {
              this.totalPages = this.getTotalPagesFromLastPageLink(reposResponse.paginationLinks);
              this.repoService.setTotalPages(this.totalPages);
            }
            sessionStorage.setItem(`${this.githubUserName}_page${pageNumber}`, JSON.stringify(this.userRepos));
            this.errorMessage = null;
            this.getReposLanguage(pageNumber);
          },
          error: (error) => {
            this.errorMessage = 'Error fetching user repos';
            console.error('Error fetching user repos:', error);
          }
        }
      );
      this.subscriptions.push(userReposSubscription);
    }
  }

  getReposLanguage(pageNumber: number) {
    const cachedData = sessionStorage.getItem(`${this.githubUserName}_page${pageNumber}`);

    const parsedData: RepoInfo[] = JSON.parse(cachedData!);
    const requests: Observable<string[]>[] = [];

    parsedData.forEach((repo: RepoInfo) => {
      if (repo.languages_url && repo.languages == null) {
        requests.push(this.apiService.getReposLanguages(repo.languages_url).pipe(
          catchError(error => {
            console.error('Error fetching languages:', error);
            return of([]); // Return empty array if there's an error
          })
        ));
      }
    });

    // Combine all requests into a single observable
    const forkJoinSub = forkJoin(requests).subscribe({
      next: (responses: string[][]) => {
        responses.forEach((languagesResponse: string[], index: number) => {
          parsedData[index].languages = languagesResponse;
        });
        // Update the cached data
        sessionStorage.setItem(`${this.githubUserName}_page${pageNumber}`, JSON.stringify(parsedData));
      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      }
    });

    this.subscriptions.push(forkJoinSub);
  }

  getTotalPagesFromLastPageLink(linkHeader: string): number {
    if (!linkHeader) {
      return 0;
    }

    // Split the link header into individual links
    const linkArray = linkHeader.split(', ');

    // Iterate over each link to find the lastPage link
    for (const link of linkArray) {
      const [url, rel] = link.split('; ');
      const relMatch = rel.match(/rel="(.*)"/);

      // If the link is for the lastPage, extract and return the total pages
      if (relMatch && relMatch[1] === 'last') {
        const match = url.match(/page=(\d+)/);
        if (match) {
          return parseInt(match[1]);
        }
      }
    }

    return 0;
  }

}