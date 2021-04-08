import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "/apis/posts";
  //private REST_API_SERVER = 'http://localhost:8080/apis/posts';
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public sendGetDetailsReq(media_type:any, id: any) {
    return this.httpClient.get(`${this.REST_API_SERVER}/watch/${media_type}/${id}`);
  }

  public sendGetCastInfoReq(person_id:any) {
    return this.httpClient.get(`${this.REST_API_SERVER}/cast/${person_id}`);
  }

  public sendGetSearchReq(query:any) {
    return this.httpClient.get(`${this.REST_API_SERVER}/search/${query}`);
  }
}
