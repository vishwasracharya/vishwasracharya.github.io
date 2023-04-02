import { Component, OnInit } from '@angular/core';
// import json file with project data
import projectData from './project'
;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectArray = projectData;

  constructor() { }

  ngOnInit(): void {
  }

}
