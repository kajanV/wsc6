import { MovieService, SearchType } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  arr: Array<{id: number, title: string, text: string, img: string}> = [
    {id: 1, title: 'Shazam!', text: 'Cool movie', img: 'https://image.tmdb.org/t/p/w500/xnopI5Xtky18MPhK40cZAGAOVeV.jpg'},
    {id: 2, title: 'Dumbo', text: 'Cool movie', img: 'https://image.tmdb.org/t/p/w500/iYwKQAO1LwLpInMMdvmYChrRlHN.jpg'},
    {id: 3, title: 'Captain Marvel', text: 'Cool movie', img: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg'},
    {id: 4, title: 'How to Train Your Dragon: The Hidden World', text: 'Cool movie',
    img: 'https://image.tmdb.org/t/p/w500/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg'},
  ];


  results: Observable<any>;
  type: SearchType = SearchType.now_playing;

  constructor(private movieService: MovieService) {
    this.showTheMovies();
   }

  ngOnInit() {
  }

  showTheMovies() {
    this.results = this.movieService.showMovies(this.type);
  }

}
