import { Component } from "@angular/core";
import { RepositoryService } from "../services/repository.service";
import { GraphService } from "../services/graph.service";

@Component({
  selector: "app-header",
  template: `
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav">
            <li><img src="./assets/AddRepositoryFolder.svg" (click)="promptUserToAddRepository()" class="add-repository-button" title="Add Repository"></li>
            <li class="repo-name dropdown">
              <button class="btn btn-inverse dropdown-toggle btn-sm" id="repo-name" data-toggle="modal" data-target="#repo-modal">
                repository
                <span class="caret"></span>
              </button>
            </li>
            <li class="branch-name dropdown">
              <button class="btn btn-inverse dropdown-toggle btn-sm" id="branch-name" onclick="getAllBranches()" data-toggle="dropdown">
                branch
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" id="branch-dropdown" role="menu" aria-labelledby="branch-name">
                <li role="presentation" id="create-branch">
                  <div class="input-group menuitem">
                    <input type="text" id="branchName" class="form-control" placeholder="Search or create branch">
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button" onclick="createBranch()">OK</button>
                    </span>
                  </div>
                </li>
              </ul>
            </li>
            <li class="merge dropdown">
              <button href="#" class="btn btn-inverse dropdown-toggle btn-sm" id="merge-name" onclick="getOtherBranches()" data-toggle="dropdown">
                update from
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" id="merge-dropdown" role="menu" >
              </ul>
            </li>
            <li class="upload"><i class="fa fa-cloud-upload fa-2x" aria-hidden="true" style="color:white" onclick="pushToRemote()" title="Push"></i></li>
            <li class="download"><i class="fa fa-cloud-download fa-2x" aria-hidden="true" style="color:white" onclick="pullFromRemote()" title="Pull"></i></li>
          </ul>
          <ul class="navbar-nav navbar-right">
            <li>
              <a id="avater" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-github fa-2x" aria-hidden="true" style="color:white"></i>
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" id="user-dropdown" role="menu" >
                <li role="presentation">
                  <a href="#" id="log" class="list-group-item" onclick="displayAuthenticatePanel()">
                    sign in
                  </a>
                </li>
              </ul>
            </li>
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
    <div id="repo-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <ul class="list-group"id="repo-dropdown" role="menu" aria-labelledby="repo-name">
          </ul>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary disabled" id="cloneButton" onclick="cloneRepo()">Clone</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
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
