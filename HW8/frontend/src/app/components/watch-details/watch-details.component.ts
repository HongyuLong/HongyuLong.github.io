import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal
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
      //console.log(this.details);
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
}
