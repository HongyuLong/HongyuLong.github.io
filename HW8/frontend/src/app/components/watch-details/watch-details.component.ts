import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../../data.service'

@Component({
  selector: 'app-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.css']
})
export class WatchDetailsComponent implements OnInit {
  public media_type: any;
  public id: any;

  public details: any;

  public mobile:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.media_type = params.get('media_type');
      this.id = params.get('id');
    });

    this.dataService.sendGetDetailsReq(this.media_type, this.id).subscribe((data: any) => {
      this.details = data;
      console.log(this.details);
    });

    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }
  }

}
