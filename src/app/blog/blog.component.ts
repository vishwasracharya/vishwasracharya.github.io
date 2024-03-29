import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogServiceService } from './blog-service.service';
import techBlogData from './tech-blog';
import { GET_ALL_POSTS } from '../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {

  posts: any;
  nextPageToken: any;
  isLoading: boolean = false;
  loadMoreBtn: boolean = false;

  techBlog: any = [];

  unsubscribe: any = [];

  constructor(
    private blogService: BlogServiceService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    // this.getBlog();
    // this.getHNinitPosts(0);
  }

  getHNinitPosts(page: number): any {
    this.apollo.watchQuery({
      query: GET_ALL_POSTS,
      variables: {
        page: page
      }
    }).valueChanges.subscribe((result: any) => {
      // console.log("Hashnode posts: ", result.data.user.publication.posts);
      let data = result.data.user.publication.posts;
      if (data.length == 0) return;
      if (this.techBlog.length == 0) {
        this.techBlog = result.data.user.publication.posts;
        this.getHNinitPosts(page + 1);
      } else {
        this.techBlog = this.techBlog.concat(result.data.user.publication.posts);
        this.getHNinitPosts(page + 1);
      }
    });
  }

  getBlog() {
    this.isLoading = true;
    let blogData = this.blogService.getPosts().subscribe((data: any) => {
      // console.log(data);
      let postData = data.items;
      let page = data.nextPageToken;

      if (postData.length > 0) this.posts = postData;

      if (page) this.nextPageToken = page;

      this.isLoading = false;
    });

    this.unsubscribe.push(blogData);
  }

  loadMore() {
    // console.log('load more');
    this.loadMoreBtn = true;

    let blogPageData = this.blogService.getPostByPageId(this.nextPageToken).subscribe((data: any) => {
      let postData = data.items;
      let page = data.nextPageToken;

      if (postData.length > 0) this.posts = this.posts.concat(postData);

      if (page != undefined) this.nextPageToken = page;
      else this.nextPageToken = null;

      this.loadMoreBtn = false;
    });

    this.unsubscribe.push(blogPageData);
  }

  getSlugofPost(postUrl: any) {
    return postUrl.split('/')[5].split('.')[0];
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((element: any) => {
      element.unsubscribe();
    });
  }
}
