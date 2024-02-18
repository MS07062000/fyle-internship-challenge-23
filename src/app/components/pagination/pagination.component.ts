import { Component } from '@angular/core';
import { RepoService } from 'src/app/services/repoServices/repo.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  currentPage!: number;
  totalPages!: number;
  showFirstPageButton!: boolean;
  showLastPageButton!: boolean;
  pageRange!: number[];

  constructor(private repoService: RepoService) {
    this.totalPages = this.repoService.totalPages;
    this.repoService.currentPage$.subscribe({
      next: (currentPage: number) => {
        this.currentPage = currentPage;
        this.showFirstPageButton = !(currentPage === 1);
        this.showLastPageButton = !(currentPage === this.totalPages);
      }
    });

    this.repoService.visiblePageRange$.subscribe({
      next: (pageRange: { startPage: number, endPage: number }) => {
        this.pageRange = Array.from({ length: pageRange.endPage - pageRange.startPage + 1 }, (_, i) => pageRange.startPage + i);
      }
    })
  }

  changePage(newPage: number) {
    this.repoService.setCurrentPage(newPage);
  }
}
