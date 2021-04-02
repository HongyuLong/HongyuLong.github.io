import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public sendGetDetailsReq(media_type:any, id: any) {
    // let params = new HttpParams();
    // params = params.append('media_type', media_type);
    // params = params.append('id', id);
    // return this.httpClient.get(this.REST_API_SERVER, {params: params});
    return this.httpClient.get(`http://localhost:3000/watch/${media_type}/${id}`);
  }

  public sendGetCastInfoReq(person_id:any) {
    return this.httpClient.get(`${this.REST_API_SERVER}/cast/${person_id}`);
  }
}
