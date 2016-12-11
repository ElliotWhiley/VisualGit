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
              <ul class="dropdown-menu" id="repo-dropdown" role="menu">
                <li><a href="#">WTF</a></li>
              </ul>
            </li>
            <li><img src="./assets/RightArrow.svg" class="right-arrow" href="#"></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" id="branch-name" onclick="getAllBranches()" data-toggle="dropdown">
                Branch
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" id="branch-dropdown" role="menu" >
                <li role="presentation" id="create-branch">
                  <div class="input-group">
                    <input type="text" id="branchName" class="form-control" placeholder="Search or create branch">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button" onclick="createBranch()">OK</button>
                    </span>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" class="dropdown-toggle btn btn-inverse" id="merge-name" onclick="getOtherBranches()" style="font-size : 20px" data-toggle="dropdown">
                Update From
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" id="merge-dropdown" role="menu" >
              </ul>
            </li>
          </ul>
          <img src="./assets/Pull.svg" class="pull-button" onclick="pullFromRemote()" title="Pull">
          <img src="./assets/Push.svg" class="push-button" onclick="pushToRemote()" title="Push">
          <ul class="navbar-nav navbar-right">
            <li><img id="avater" height="50" width="50" src="./assets/AddRepositoryFolder.svg" align="right"></li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Info</h4>
          </div>
          <div class="modal-body" id="modal-text-box">
            unset
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
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
