import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.css']
})
export class WatchDetailsComponent implements OnInit {
  public media_type: any;
  public id: any;

  public video: any;
  public details: any;
  public casts: any;
  public cast_info:any;
  public reviews: any;

  public recommended_single: any;
  public recommended_grouped: any;
  public similar_single:any;
  public similar_grouped:any;

  public mobile:boolean = false;
  public has_recommended:boolean = false;
  public has_similar:boolean = false;

  // alert
  private _success = new Subject<string>();
  public add_to:boolean = true;
  public alert_str:string = 'Added to';
  successMessage = '';

  @ViewChild('addAlert', {static: false}) addAlert: any;
  @ViewChild('removeAlert', {static: false}) removeAlert: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal,
    private youtubePlayer: YouTubePlayerModule
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.media_type = params.get('media_type');
      this.id = params.get('id');
    });

    this.dataService.sendGetDetailsReq(this.media_type, this.id).subscribe((data: any) => {
      this.video = data.video;
      this.details = data.details;
      this.casts = data.casts;
      this.reviews = data.reviews;
      this.recommended_single = data.recommended.single;
      this.recommended_grouped = data.recommended.grouped;
      this.similar_single = data.similar.single;
      this.similar_grouped = data.similar.grouped;
      this.has_recommended = data.has_recommended;
      this.has_similar = data.has_similar;
      //console.log(this.details);
    });

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.addAlert) {
        this.addAlert.close();
      }
      if(this.removeAlert) {
        this.removeAlert.close();
      }
    });

    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }
  }

  getCastInfo(person_id:any, content:any) {
    this.dataService.sendGetCastInfoReq(person_id).subscribe((data: any) => {
      this.cast_info = data;
      console.log(person_id);
      console.log(this.cast_info);
      this.modalService.open(content);
    });
  }

  open(content:any) {
    this.modalService.open(content);
  }

  changeButtonState() {
    if(this.add_to) {
      this.alert_str = 'Added to';
    }
    else {
      this.alert_str = 'Removed from';
    }
    this.add_to = !this.add_to;
    this._success.next(`${this.alert_str} watchlist.`); 
  }
}
