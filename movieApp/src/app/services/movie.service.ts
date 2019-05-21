import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  url = 'https://api.themoviedb.org/3/';
  apiKey = 'ccbc9f3807aab2fdde56da16e55421a8';
  toast = null;

  constructor(private http: HttpClient, private network: Network, private plt: Platform, public toastController: ToastController) {
    this.plt.ready().then(() => {
      // uncomment this once function is implemented
      // this.checkNetwork();
      });
     }

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

  checkNetwork() {
    const disconnectSubscription =
    this.network.onDisconnect().subscribe(async () => {
    console.log('network was disconnected :-(');
    this.toast = await this.toastController.create({
    message: 'You are offline',
    showCloseButton: true,
    color: 'danger'
    });
    this.toast.present();
    });
    const connectSubscription = this.network.onConnect().
    subscribe(async () => {
    console.log('network connected!');
    this.toast.dismiss(); // dismiss old toast
    this.toast = await this.toastController.create({
    message: 'You are back online',
    showCloseButton: true,
    duration: 2000
    });
    this.toast.present();
    });
  }
}
