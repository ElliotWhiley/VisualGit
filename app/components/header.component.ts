import { Component } from "@angular/core";
import { RepositoryService } from "../services/repository.service";
import { GraphService } from "../services/graph.service";

@Component({
  selector: "app-header",
  template: `
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse">
          <ul class="nav navbar-nav">
            <li><img src="./assets/AddRepositoryFolder.svg" (click)="promptUserToAddRepository()" class="add-repository-button" title="Add Repository"></li>
            <li><img src="./assets/RightArrow.svg" class="right-arrow" href="#"></li>
            <li class="dropdown repo-name">
              <a href="#" class="dropdown-toggle" id="repo-name" data-toggle="dropdown">
                Repository
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#">jmeter</a></li>
              </ul>
            </li>
            <li><img src="./assets/RightArrow.svg" class="right-arrow" href="#"></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" id="branch-name" data-toggle="dropdown">
                Branch
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu" >
                <li role="presentation">
                  <div class="input-group">
                    <input type="text" id="branchName" class="form-control" placeholder="Search or create branch">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button" onclick="createBranch()">OK</button>
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <img src="./assets/Pull.svg" class="pull-button" onclick="pullFromRemote()" title="Pull">
          <img src="./assets/Push.svg" class="push-button" onclick="pushToRemote()" title="Push">
          <ul class="navbar-nav navbar-right">
            <li><img id="avater" height="70" width="70" src="./assets/AddRepositoryFolder.svg" align="right"></li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="modal" class="modal">
      <div class="modal-content">
        <img src="./assets/Close.svg" class="close">
        <p id="modal-text-box">unset</p>
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
