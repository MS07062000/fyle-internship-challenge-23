import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReposCardComponent } from './user-repos-card.component';

describe('UserReposCardComponent', () => {
  let component: UserReposCardComponent;
  let fixture: ComponentFixture<UserReposCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReposCardComponent]
    });
    fixture = TestBed.createComponent(UserReposCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
