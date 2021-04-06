import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Router,NavigationEnd   } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  public add_to:boolean = true;  // true if not exist in watchList
  public alert_str:string = 'Added to';
  successMessage = '';

  // local storage
  public watch_list:any;
  public cont_list:any;


  @ViewChild('addAlert', {static: false}) addAlert: any;
  @ViewChild('removeAlert', {static: false}) removeAlert: any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal,
    private youtubePlayer: YouTubePlayerModule,
    private router: Router,
    public breakpointObserver: BreakpointObserver
  ) { 
  }

  ngOnInit(): void {
    var watch_str = localStorage.getItem('watchList');
    if(watch_str == null) {
      this.watch_list = [];
    }
    else {
      this.watch_list = JSON.parse(watch_str);
    }
    //console.log('initial watch_list=', this.watch_list);
    
    this.route.paramMap.subscribe(params => {
      this.media_type = params.get('media_type');
      this.id = params.get('id');
    });

    this.dataService.sendGetDetailsReq(this.media_type, this.id).subscribe((data: any) => {
      window.scroll(0,0);
      //console.log(data);
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
      this.addToFrontCont();
    });

    this.add_to = this.checkIfNotExist(this.watch_list);
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.addAlert) {
        this.addAlert.close();
      }
      if(this.removeAlert) {
        this.removeAlert.close();
      }
    });

    if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
      this.mobile = true;
      console.log('mobile=', this.mobile);
    }

  }

  addToFrontCont() {
    // add current media to the front of contList
    var cont_str = localStorage.getItem('contList');
    if(cont_str == null) {
      this.cont_list = [];
    }
    else {
      this.cont_list = JSON.parse(cont_str);
    }
    if(this.details != null) {
      this.addToStorage(this.cont_list, true);
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

  clickAddButton() {
    this.addToStorage(this.watch_list, false);
    this.add_to = !this.add_to;
    this._success.next('Added to watchlist.')
  }

  clickRemoveButton() {
    this.removeFromStorage();
    this.add_to = !this.add_to;
    this._success.next('Removed from watchlist.')
  }

  addToFront(list_name:any, has_bar:boolean) {
    // latest one always at the front of the array
    list_name.unshift({'id': this.id, 'media_type': this.media_type, 'title': this.details.title, 'poster_path': this.details.poster_path});
    if(has_bar && list_name.length > 24) {
      list_name.pop();  // remove the last one
    }
  }

  checkIfNotExist(list_name:any) {
    let j = -1;
    for(let i = 0; i < list_name.length; ++i) {
      if(list_name[i].id == this.id && list_name[i].media_type == this.media_type) {
        // exist, then remove it
        j = i;
        console.log('find the one!');
        break;
      }
    }
    return j < 0;  // true if not exist
  }

  removeIfExist(list_name:any) {
    // remove current media if already exist
    let j = -1;
    for(let i = 0; i < list_name.length; ++i) {
      if(list_name[i].id == this.id && list_name[i].media_type == this.media_type) {
        // exist, then remove it
        j = i;
        console.log('find the one!');
        break;
      }
    }

    if(j >= 0) {
      list_name.splice(j, 1);
    }
  }

  addToStorage(list_name:any, has_bar:boolean) {
    this.removeIfExist(list_name);
    this.addToFront(list_name, has_bar);
    if(has_bar) {
      localStorage.removeItem('contList');
      localStorage.setItem('contList', JSON.stringify(list_name));
      console.log('after add to continue: ', localStorage);
      console.log('cont_list', this.cont_list);
    }
    else {
      localStorage.removeItem('watchList');
      localStorage.setItem('watchList', JSON.stringify(list_name));
      //console.log('after add Button: ', localStorage);
      //console.log('Add to watch_list=', this.watch_list);
    }
  }

  removeFromStorage() {
    // only called by 'remove from watchlist' button
    this.removeIfExist(this.watch_list);
    localStorage.removeItem('watchList');
    localStorage.setItem('watchList', JSON.stringify(this.watch_list));
    console.log('after remove Button:', localStorage);
    console.log('remove from watch_list=', this.watch_list);
  }
}
