import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {
  url = "assets/response.json";
  list: any[] = [];

  constructor(private http: HttpClient) {

    this.http.get<any>(this.url).subscribe(
      (res) => {
        this.list = res.results;
      }
    )
  }
  getJson() {
    return this.http.get<any>(this.url)
  }

  editTitle(value: any, oldValue: any,id:any) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.put(`${this.url}/:${id}`,
      {
        oldValue,
        value
      },
      { headers })
  }



}
