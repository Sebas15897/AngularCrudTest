import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private http: HttpClient) {}
  getPost() {
    return this.http.get<any>(this.url);
  }
  deletePost(id:any) {
    return this.http.get<any>(this.url + id);
  }
}
