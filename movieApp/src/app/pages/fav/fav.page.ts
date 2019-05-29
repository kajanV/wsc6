import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';
import { MovieService, SearchType } from './../../services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  keys: Array<object> = [];


  constructor(private movieService: MovieService, private storage: Storage, private storageService: StorageService) { }

  ngOnInit() {
    this.getAllFav();
  }

  getAllFav() {
    return this.storageService.readWatchLaterAll().then(item => {
      item.forEach(element => {
        this.movieService.getDetails(element).subscribe(result => {
          console.log(result);
          this.keys.push(result);
        });
      });
    });
  }
}
