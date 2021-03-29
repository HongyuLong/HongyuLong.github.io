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
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  //all_data = {}
  now_playing: any;
  pop_mv_single: any;
  pop_mv_grouped: any;

  mobile: boolean=false;

  // @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe((data: any)=>{
      this.now_playing = data.now_playing;
      this.pop_mv_single = data.pop_mv.single;
      this.pop_mv_grouped = data.pop_mv.grouped;
    }) 
    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }
  }

}
