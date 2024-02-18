import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RepoService {
  currentPage = new BehaviorSubject<number>(1); // Initialize with default value
  currentPage$ = this.currentPage.asObservable();
  totalPages!: number;
  private visiblePageRange = new BehaviorSubject<{ startPage: number; endPage: number }>({ startPage: 1, endPage: 1 }); // Initialize with default range
  visiblePageRange$ = this.visiblePageRange.asObservable();

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
    this.setVisiblePageRange();
  }

  setCurrentPage(currentPage: number) {
    this.currentPage.next(currentPage);
    if (!this.isCurrentPageWithinVisibleRange()) {
      this.setVisiblePageRange();
    }
  }

  setVisiblePageRange() {
    const startPage: number = Math.max(1, this.currentPage.value);
    const endPage: number = Math.min(this.currentPage.value + 8, this.totalPages);
    this.visiblePageRange.next({ startPage, endPage });
  }

  isCurrentPageWithinVisibleRange() {
    const visibleRange = this.visiblePageRange.value;
    return this.currentPage.value >= visibleRange.startPage && this.currentPage.value <= visibleRange.endPage;
  }
}