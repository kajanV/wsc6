import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService, SearchType } from './../../services/movie.service';


import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';

import { ToastController } from '@ionic/angular';

import { IonicRatingModule } from 'ionic4-rating';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  id = '';
  information = null;
  possibleYoutubeTrailers = [];

  isWatchLater: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService,
              private storage: Storage,
              private storageService: StorageService,
              public toastController: ToastController,
              private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get movie details
    this.movieService.getDetails(this.id).subscribe(result => {
      this.information = result;
    });

    this.movieService.getYoutubeMovies(this.id).subscribe(result => {
      this.possibleYoutubeTrailers = result.filter(res => res.site === 'YouTube');
    });
    this.checkWatchLater();
  }

  async presentToast(toastText: string) {
    const toast = await this.toastController.create({
      message: toastText,
      duration: 2000
    });
    toast.present();
  }

  checkWatchLater() {
    this.storageService.readWatchLater(this.id).then(item => {
      this.isWatchLater = item;
    });
  }

  addToWatchLater() {
    this.storageService.createWatchLater(this.id).then(item => {
      this.isWatchLater = item;
      this.presentToast('Added Movie to your Watch Later list.');
    });
  }

  removeWatchLater() {
    this.storageService.deleteWatchLater(this.id).then(item => {
      this.isWatchLater = false;
      this.presentToast('Removed movie from your Watch Later list.');
    });
  }

  displayTrailer(trailer) {
    this.youtube.openVideo(trailer.key);
  }

}
