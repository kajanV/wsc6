import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export enum SearchType {
  now_playing = 'movie/now_playing',
  latest = 'movie/latest',
  upcoming = 'movie/upcoming',
  moviedetails = 'movie/' // movie/id
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'https://api.themoviedb.org/3/';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

   // now playing
   showMovies(type: SearchType): Observable<any> {
    // https://api.themoviedb.org/3/movie/now_playing?api_key=c900dccc090f86acc4221fdcebe55d74&language=en-US&page=1
    return this.http.get(`${this.url}${type}?api_key=${this.apiKey}&language=en-US`)
    .pipe(map(results => results['results'])); }


  getDetails(id): Observable<any> {
    // https://api.themoviedb.org/3/movie/297802?api_key=c900dccc090f86acc4221fdcebe55d74&language=en-US
    return this.http.get(`${this.url}movie/${id}?api_key=${this.apiKey}&language=en-US`)
    .pipe(
     map(results => {
       return results;
     })
    );
  }

}
