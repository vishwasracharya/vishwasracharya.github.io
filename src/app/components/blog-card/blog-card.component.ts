import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() post: any;

  constructor() { }

  ngOnInit(): void {
  }

  getSlugofPost(postUrl: any) {
    return postUrl.split('/')[5].split('.')[0];
  }
}
