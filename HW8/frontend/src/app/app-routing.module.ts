import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WatchDetailsComponent } from './components/watch-details/watch-details.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'mylist', component: WatchlistComponent},
  {path:'watch/:media_type/:id', component: WatchDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
