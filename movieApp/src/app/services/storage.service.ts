import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isWatchLater: boolean = false;
  private watchLaterDb: any;

  constructor(private storage: Storage) {
      this.watchLaterDb = new Storage({
      name: '__my_custom_db',
      storeName: '_watchlater',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });

   }

   createWatchLater(key): Promise<any> {
    // check if movie is favorited already
    return this.readWatchLater(key).then(item => {
      // create favorite
      if (!this.isWatchLater) {
        return this.watchLaterDb.set(key, 'true');
      }
    });
  }

  readWatchLater(key): Promise<any> {
    return this.watchLaterDb.get(key).then((val) => {
      if (val == null || val === false) {
       this.isWatchLater = false;
       return false;
      } else {
        this.isWatchLater = true;
        return true;
      }
    });
  }

  deleteWatchLater(key): Promise<any> {
    // check if movie is favorited already
    return this.readWatchLater(key).then(item => {
        // delete favorite
        if (this.isWatchLater) {
          return this.watchLaterDb.remove(key);
          }
    });
  }

}
