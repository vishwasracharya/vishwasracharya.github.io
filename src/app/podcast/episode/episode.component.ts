import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import podcastData from '../podcast';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  WEBSITE_URL: string = environment.website_url;

  podAvailaibility = podcastData[0].pod_availaibility;
  podDetails = podcastData[0].pod_details;
  podEpisodes = podcastData[0].pod_episodes;
  slug: any;
  episode: any;
  embed: any;

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.slug = this.route.snapshot.paramMap.get('slug');
  }


  ngOnInit(): void {
    // filter the episodes array to find the episode with the id that matches the id in the url
    const episode = this.podEpisodes.filter(episode => episode.slug === this.slug)[0];
    this.episode = episode;
    this.embed = this.sanitazeHtml(episode.episode_emLink ? episode.episode_emLink : '')
  }

  sanitazeHtml(html: any) {
    return html.replace(
      /style=".*?"|<img.*?>|<object.*?<\/object>|<p><\/p>|<p>&nbsp;<\/p>|<p>\s*<\/p>|<br>|<div class="separator">.*?<\/div>/g,
      ''
    );
  }
}
