import { Component } from "@angular/core";
import { RepositoryService } from "../services/repository.service";
import { GraphService } from "../services/graph.service";

@Component({
  selector: "app-header",
  template: `
    <div class="header">
      <img src="./assets/AddRepositoryFolder.svg" (click)="promptUserToAddRepository()" class="add-repository-button" title="Add Repository">
      <img src="./assets/RightArrow.svg" class="right-arrow">
      <p class="repo-name" id="repo-name">repository</p>
      <img src="./assets/RightArrow.svg" class="right-arrow">
      <p class="branch-name" id="branch-name">branch</p>
      <img src="./assets/Pull.svg" class="pull-button" onclick="pullFromRemote()" title="Pull">
      <img src="./assets/Push.svg" class="push-button" onclick="pushToRemote()" title="Push">

      <div id="modal" class="modal">
        <div class="modal-content">
          <img src="./assets/Close.svg" class="close">
          <p id="modal-text-box">unset</p>
        </div>
      </div>
    </div>
  `,
  providers: [RepositoryService, GraphService]
})

export class HeaderComponent   {
  repoName: string = "Repo name";
  repoBranch: string = "Repo branch";
  repository: any;

  promptUserToAddRepository(): void {
    switchToAddRepositoryPanel();
  }
}
