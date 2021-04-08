import { analyzeAndValidateNgModules, formattedError } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../services/data.service'
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-dynamic-carousel',
  templateUrl: './dynamic-carousel.component.html',
  styleUrls: ['./dynamic-carousel.component.css']
})
export class DynamicCarouselComponent implements OnInit {
  now_playing: any;
  mobile: boolean=false;

  // @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private dataService: DataService,
    public breakpointObserver: BreakpointObserver) {
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
    //localStorage.clear();
    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.now_playing = data.now_playing;
    }) 
  }
}
