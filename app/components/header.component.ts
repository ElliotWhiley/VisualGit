import { Component } from "@angular/core";
import { RepositoryService } from "../services/repository.service";
import { GraphService } from "../services/graph.service";

@Component({
  selector: "app-header",
  template: `
    <div class="header">
      <button (click)="promptUserToAddRepository()" title="Add Repository">+</button>
      <p class="repo-name" id="repo-name">/ </p>
      <p class="branch-name" id="branch-name">/ </p>
      <img src="./assets/arrow.png" class="pull-button" onclick="pullFromRemote()" title="Pull">
      <img src="./assets/arrow.png" class="push-button" onclick="pushToRemote()" title="Push">

      <div id="modal" class="modal">
        <div class="modal-content">
          <span class="close">x</span>
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
