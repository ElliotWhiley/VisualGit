import { Component } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <button (click)="cloneRepository()">+</button>
      <p>{{repoName}}</p>
      <p>{{repoBranch}}</p>
    </div>
  `,
  providers: [RepositoryService, GraphService]
})

export class HeaderComponent   {
  repoName: string = 'Repo name';
  repoBranch: string = 'Repo branch';
  repository: any;

  constructor(private repositoryService: RepositoryService, private graphService: GraphService) {
  //   this.repoName = repositoryService.getRepoName();
  //   this.repoBranch = repositoryService.getCurrentBranch();
  }

  cloneRepository(): void {
    console.log('test!!');
    //this.graphService.drawGraph();
    drawGraph();

    this.repoName = this.repositoryService.getRepoName();
    this.repoBranch = this.repositoryService.getCurrentBranch();
  }

}
