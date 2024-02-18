import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultUserCardComponent } from './search-result-user-card.component';

describe('SearchResultUserCardComponent', () => {
  let component: SearchResultUserCardComponent;
  let fixture: ComponentFixture<SearchResultUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultUserCardComponent]
    });
    fixture = TestBed.createComponent(SearchResultUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
