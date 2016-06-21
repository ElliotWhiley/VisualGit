import { Component } from '@angular/core';
import { RepoService } from '../services/repo.service';

// var NodeGit = require("nodegit");

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <button (click)="promptUserToAddRepository()">+</button>
      <p>{{repoName}}</p>
      <p>{{repoBranch}}</p>
    </div>
  `,
  providers: [RepoService]
})

export class HeaderComponent   {
  repoName: string = 'Repo name';
  repoBranch: string = 'Repo branch';
  repository: any;

  constructor(private repoService: RepoService) {
  //   this.repoName = repoService.getRepoName();
  //   this.repoBranch = repoService.getCurrentBranch();
  }

  promptUserToAddRepository(): void {
    console.log('test!!');
  }

}
