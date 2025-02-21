import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://help-search-api-prod.herokuapp.com/api/search/search';

  constructor(private http: HttpClient) { }

  // Fetch search results from the API
  search(query: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
}
