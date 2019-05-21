import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  foundMoviesList: any[] = [];

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  onSearchChange(evt: CustomEvent) {
    const keyWord: string = evt.detail.value;
    if (!keyWord.length) {
      this.foundMoviesList = [];
    } else {
      this.searchService.searchMovies(keyWord).subscribe((results) => this.foundMoviesList = results);
    }
  }

  onClickMovie(keyword: string) {
    console.log(keyword);
  }

}
