import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'hot',
        loadChildren: '../pages/movies/movies.module#MoviesPageModule'
      },
      {
        path: 'fav',
        loadChildren: '../pages/fav/fav.module#FavPageModule'
      },
      {
        path: 'genres',
        loadChildren: '../pages/genres/genres.module#GenresPageModule'
      },
      {
        path: 'search',
        loadChildren: '../pages/search/search.module#SearchPageModule'
      },
      {
        path: '**',
        redirectTo: '/hot',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/app/hot',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
