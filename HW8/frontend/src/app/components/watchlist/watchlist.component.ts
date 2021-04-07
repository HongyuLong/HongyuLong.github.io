import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // local storage
  public my_watch_list:any;
  public mobile:boolean = false;
  constructor(public breakpointObserver: BreakpointObserver) {
      this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 600px or over!');
          this.mobile = false;
        } else {
          console.log('Viewport is smaller than 600px!');
          this.mobile = true;
        }
      });
  }

  ngOnInit(): void {
    var watch_str = localStorage.getItem('watchList');
    if(watch_str == null) {
      this.my_watch_list = [];  // null
    }
    else {
      this.my_watch_list = JSON.parse(watch_str);
    }
    //console.log('initial watch_list=', this.my_watch_list);
  }

}
