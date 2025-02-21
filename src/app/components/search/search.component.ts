import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  results: any[] = [];
  totalResults: number = 0;
  currentPage: number = 1;
  resultsPerPage: number = 10;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Search function to fetch results from the API
  search(query: string) {
    this.searchService.search(query, this.currentPage).subscribe((data: any) => {
      this.results = data.results;
      this.totalResults = data.total_results;
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: query, page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  // Handle pagination
  onPageChange(page: number) {
    this.currentPage = page;
    this.search(this.query);
  }

  ngOnInit() {
    // Check if there's a query parameter in the URL
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.query = params['query'];
        this.currentPage = params['page'] || 1;
        this.search(this.query);
      }
    });
  }
}
