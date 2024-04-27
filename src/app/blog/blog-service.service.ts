import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogServiceService {
  API_BASE_URL = environment.blogger_base_url;
  API_BLOG_ID = environment.blogger_blog_id;
  API_KEY = environment.blogger_api_key;

  constructor(private http: HttpClient) {}

  getBlog() {
    let url = `${this.API_BASE_URL}${this.API_BLOG_ID}?key=${this.API_KEY}`;
    return this.http.get(url);
  }

  getPosts() {
    let url = `${this.API_BASE_URL}${this.API_BLOG_ID}/posts?key=${this.API_KEY}`;
    return this.http.get(url);
  }

  getPostById(id: string) {
    let url = `${this.API_BASE_URL}${this.API_BLOG_ID}/posts/${id}?key=${this.API_KEY}`;
    return this.http.get(url);
  }

  getPostByPageId(pageId: string) {
    let url = `${this.API_BASE_URL}${this.API_BLOG_ID}/posts?key=${this.API_KEY}&pageToken=${pageId}`;
    return this.http.get(url);
  }

  getMediumBlogPosts(): Observable<any> {
    const mediumUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vishwasacharya"
    return this.http.get(mediumUrl);
  }
}
