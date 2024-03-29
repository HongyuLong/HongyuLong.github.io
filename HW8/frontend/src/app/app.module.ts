import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { WatchDetailsComponent } from './components/watch-details/watch-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DynamicCarouselComponent } from './components/dynamic-carousel/dynamic-carousel.component';
import { StaticCarouselComponent } from './components/static-carousel/static-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    WatchlistComponent,
    WatchDetailsComponent,
    NavBarComponent,
    DynamicCarouselComponent,
    StaticCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
