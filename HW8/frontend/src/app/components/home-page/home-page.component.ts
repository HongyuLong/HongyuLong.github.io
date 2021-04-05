import { analyzeAndValidateNgModules, formattedError } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../data.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  shifts: Array<number> = [1, 2, 3, 4, 5];

  now_playing: any;
  pop_mv_single: any;
  pop_mv_grouped: any;

  top_mv_single: any;
  top_mv_grouped: any;

  trending_mv_single: any;
  trending_mv_grouped: any;

  pop_tv_single: any;
  pop_tv_grouped: any;

  top_tv_single: any;
  top_tv_grouped: any;

  trending_tv_single: any;
  trending_tv_grouped: any;

  my_cont_list = [];  // continue watching list
  cont_list_grouped:any; // grouped list
  mobile: boolean=false;

  // @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //localStorage.clear();
    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.now_playing = data.now_playing;
      this.pop_mv_single = data.pop_mv.single;
      this.pop_mv_grouped = data.pop_mv.grouped;

      this.top_mv_single = data.top_mv.single;
      this.top_mv_grouped = data.top_mv.grouped;

      this.trending_mv_single = data.trending_mv.single;
      this.trending_mv_grouped = data.trending_mv.grouped;

      this.pop_tv_single = data.pop_tv.single;
      this.pop_tv_grouped = data.pop_tv.grouped;

      this.top_tv_single = data.top_tv.single;
      this.top_tv_grouped = data.top_tv.grouped;

      this.trending_tv_single = data.trending_tv.single;
      this.trending_tv_grouped = data.trending_tv.grouped;
    }) 

    this.cont_list_grouped = this.getCont2DList();

    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }
  }

  getCont2DList() {
    var cont_str = localStorage.getItem('contList');
    if(cont_str == null) {
      this.my_cont_list = [];  // null
    }
    else {
      this.my_cont_list = JSON.parse(cont_str);
    }

    var j = -1;
    var grouped = [];
    for(var i = 0; i < this.my_cont_list.length; ++i) {
      if(i % 6 == 0) {
        j++;
        grouped[j] = [];
        grouped[j].push(this.my_cont_list[i]);
      }
      else {
        grouped[j].push(this.my_cont_list[i]);
      }
    }
    return grouped;
  }

}
