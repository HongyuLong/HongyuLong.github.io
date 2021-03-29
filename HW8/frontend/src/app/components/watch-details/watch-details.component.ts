import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watch-details',
  templateUrl: './watch-details.component.html',
  styleUrls: ['./watch-details.component.css']
})
export class WatchDetailsComponent implements OnInit {
  public media_type: any;
  public id: any;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.media_type = params.get('media_type');
      this.id = params.get('id');
    });
  }

}
