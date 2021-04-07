import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime,distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { DataService } from '../../data.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(
    private dataService:DataService,
  ) { }

  ngOnInit(): void {
    
  }

  search = (text$: any) => {
    return text$.pipe(
      debounceTime(200),
      switchMap( (searchText) =>  this.dataService.sendGetSearchReq(searchText))
     );
  }
  
  formatter = (x: {name: string}) => x.name;

  onSelect($event:any, input:any) {
    $event.preventDefault();
    input.value = "";
    this.isMenuCollapsed = true;
  }
}
