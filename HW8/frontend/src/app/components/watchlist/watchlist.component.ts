import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // local storage
  public my_watch_list:any;
  constructor() { }

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
