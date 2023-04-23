import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogServiceService } from '../blog-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  WEBSITE_URL: string = environment.website_url;

  id: any;
  post: any;
  isLoading: boolean = false;
  loadMoreBtn: boolean = false;

  content: any;
  labels: any;
  publishedDate: any;
  updatedDate: any;

  recentPosts: any;

  isBlogger: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (isNaN(this.id)) {
      console.log('hashnode slug');
    } else {
      this.isBlogger = true;
      console.log('Blogger id');
      this.getPost();
      this.getAllPosts();
    }

  }

  getPost() {
    this.isLoading = true;
    this.blogService.getPostById(this.id).subscribe((data: any) => {
      console.log(data);
      this.post = data;
      this.content = this.sanitazeHtml(data.content ? data.content : '');
      this.labels = data.labels ? data.labels : [];
      this.publishedDate = data.published ? data.published : '';
      this.updatedDate = data.updated ? data.updated : '';
    });
    this.isLoading = false;
  }

  getSlugofPost(postUrl: any) {
    return postUrl.split('/')[5].split('.')[0];
  }

  sanitazeHtml(html: any) {
    return html.replace(
      /style=".*?"|<img.*?>|<object.*?<\/object>|<p><\/p>|<p>&nbsp;<\/p>|<p>\s*<\/p>|<br>|<div class="separator">.*?<\/div>/g,
      ''
    );
  }

  getAllPosts() {
    this.blogService.getPosts().subscribe((data: any) => {
      let postData = data;
      if (postData) postData = postData.items;
      if (postData.length > 0) {
        postData = postData.filter((post: any) => post.id != this.id);
        postData = postData.slice(0, 3);
        this.recentPosts = postData;
      }
    });
  }
}
