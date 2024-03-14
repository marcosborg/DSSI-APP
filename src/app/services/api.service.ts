import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  url: string = 'https://new.appdssi.pt/api/';
  //url: string = 'http://127.0.0.1:8000/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept-Language': 'pt'
    })
  };

  solutions() {
    return this.http.get(this.url + 'solutions', this.httpOptions);
  }

  solution(solution_id: any) {
    return this.http.get(this.url + 'solutions/' + solution_id, this.httpOptions);
  }

  product(product_id: any) {
    return this.http.get(this.url + 'product/' + product_id, this.httpOptions);
  }

  manufacturers() {
    return this.http.get(this.url + 'manufacturers', this.httpOptions);
  }

  manufacturer(manufacturer_id: any) {
    return this.http.get(this.url + 'manufacturers/' + manufacturer_id, this.httpOptions);
  }

  wasabi_options(data: any) {
    return this.http.post(this.url + 'wasabi_options', data, this.httpOptions);
  }

  filter(data: any) {
    return this.http.post(this.url + 'filter', data, this.httpOptions);
  }

  search(data: any) {
    return this.http.post(this.url + 'search', data, this.httpOptions);
  }

  countries() {
    return this.http.get(this.url + 'countries', this.httpOptions);
  }

  register(data: any) {
    return this.http.post(this.url + 'register', data, this.httpOptions);
  }

  login(data: any) {
    return this.http.post(this.url + 'login', data, this.httpOptions);
  }

  user(access_token: string) {
    console.log(access_token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token
      })
    };
    return this.http.get(this.url + 'user', httpOptions);
  }

}
