import { Component, OnInit } from '@angular/core';
import podcastData from './podcast';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
})
export class PodcastComponent implements OnInit {

  podAvailaibility = podcastData[0].pod_availaibility;
  podDetails = podcastData[0].pod_details;
  podEpisodes = podcastData[0].pod_episodes;

  constructor() {}

  ngOnInit(): void {
  }
}
