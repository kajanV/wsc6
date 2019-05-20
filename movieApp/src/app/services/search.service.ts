import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // https://api.themoviedb.org/3/search/movie?api_key=ccbc9f3807aab2fdde56da16e55421a8&language=en-US&query=how%20to&page=1&include_adult=false

  private url = 'https://api.themoviedb.org/3/search';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  searchMovies(keyword: string): Observable<any[]> {
    const url = `${this.url}/movie?api_key=${this.apiKey}&language=en-US&&query=${keyword}&page=1&include_adult=false`;
    return this.http.get(url)
      .pipe(map((res: any) => res.results));
  }

}
