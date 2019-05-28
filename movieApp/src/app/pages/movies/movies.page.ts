import { MovieService, SearchType } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  results: Observable<any>;
  type: SearchType = SearchType.now_playing;

  constructor(private movieService: MovieService) {
    this.showTheMovies();
   }

  ngOnInit() {
  }

  showTheMovies() {
    return this.results = this.movieService.showMovies(this.type);
  }

  refreshMovies(event) {
    this.showTheMovies().subscribe(
      () => this.completeRefresh(event)
    );
  }

  completeRefresh(event) {
    event.target.disabled = true;
    setTimeout( () => {
      event.target.complete();
    }, 1000);
    setTimeout(() => {
      event.target.disable = false;
    }, 100);
  }
}
