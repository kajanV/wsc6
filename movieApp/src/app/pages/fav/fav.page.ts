import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';
import { MovieService, SearchType } from './../../services/movie.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  keys = [];


  constructor(private movieService: MovieService, private storage: Storage, private storageService: StorageService) { }

  ngOnInit() {
    this.getAllFav();
  }

  getAllFav() {
    this.storageService.readWatchLaterAll().then(item => {
      this.keys = item;
    });
  }

}
