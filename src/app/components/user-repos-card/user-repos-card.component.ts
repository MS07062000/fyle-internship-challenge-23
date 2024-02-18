import { Component, Input } from '@angular/core';
import { RepoInfo } from 'src/app/interfaces/repoInfo';

@Component({
  selector: 'app-user-repos-card',
  templateUrl: './user-repos-card.component.html',
  styleUrls: ['./user-repos-card.component.scss']
})
export class UserReposCardComponent {
  @Input() repoInfo!: RepoInfo;
}
