import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-result-user-card',
  templateUrl: './search-result-user-card.component.html',
  styleUrls: ['./search-result-user-card.component.scss']
})

export class SearchResultUserCardComponent {
 @Input() UserDetails!:any;
}
