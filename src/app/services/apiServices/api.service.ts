import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../../interfaces/userInfo';
import { map, catchError, Observable } from 'rxjs';
import { RepoInfo } from 'src/app/interfaces/repoInfo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private githubApiUrl = 'https://api.github.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  searchUser(githubUsername: string, pageNumber: number) :Observable<{users:any[],paginationLink:string|null}> {
    const apiURL = `${this.githubApiUrl}/search/users`;
    const params = { q: githubUsername, page: pageNumber, per_page: 10 };
    const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
    return this.httpClient.get<any>(apiURL, { params, headers, observe: 'response' }).pipe(
      map(response => {
        const users = response!.body.items;
        const paginationLink = response!.headers.get('Link');
        return { users: users, paginationLink: paginationLink };
      }), catchError(this.handleError)
    );
  }

  getUserInfo(githubUsername: string):Observable<UserInfo> {
    const apiURL = `${this.githubApiUrl}/users/${githubUsername}`;
    const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
    return this.httpClient.get<any>(apiURL, { headers, observe: 'response' }).pipe(
      map(response => {
        return {
          avatar_url: response!.body.avatar_url,
          id: response!.body.id,
          login: response!.body.login,
          repos_url: response!.body.repos_url || null,
          html_url: response!.body.html_url || null,
          bio: response!.body.bio || null,
          blog: response!.body.blog || null,
          company: response!.body.company || null,
          email: response!.body.email || null,
          followers: response!.body.followers,
          following: response!.body.following,
          hireable: response!.body.hireable || null,
          location: response!.body.location || null,
          twitter_username: response!.body.twitter_username || null,
          name: response!.body.name || null,
          created_at: response!.body.created_at || null,
        };
      }),
      catchError(this.handleError)
    );
  }

  getUserRepos(userName: string, page: number): Observable<{ repos: RepoInfo[], paginationLinks: string | null }> {
    const apiURL = `${this.githubApiUrl}/users/${userName}/repos`;
    const params = { page: page.toString(), per_page: '10' };
    const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');

    return this.httpClient.get<any>(apiURL, { params, headers, observe: 'response' }).pipe(
      map(response => {
        const repos = response.body;
        const modifiedRepos: RepoInfo[] = repos.map((repo: any) => {
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            languages_url: repo.languages_url,
            stargazers_url: repo.stargazers_url,
            forks_url: repo.forks_url,
            visibility: repo.visibility
          }
        });

        return {
          repos: modifiedRepos,
          paginationLinks: response.headers.get('Link')
        }
      }),
      catchError(error => {
        // Handle error for main getUserRepos request
        console.error('Error fetching user repositories:', error);
        return [];
      })
    );
  }


  getReposLanguages(reposLanguageApiURL: string): Observable<string[]> {
    const headers = new HttpHeaders().set('Accept', 'application/vnd.github.v3+json');
    return this.httpClient.get<any>(reposLanguageApiURL, { headers, observe: 'response' }).pipe(
      map(response => {
        const languages = Object.keys(response!.body) as string[];
        return languages;
      }),
      catchError((error) => [])
    );
  }

  private handleError(error: any): never {
    console.error('An error occurred:', error);
    throw new Error('Something went wrong; please try again later.');
  }
}