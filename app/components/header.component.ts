import { Component } from "@angular/core";
import { RepositoryService } from "../services/repository.service";
import { GraphService } from "../services/graph.service";

@Component({
  selector: "app-header",
  template: `
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="container-fluid row">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <img src="./assets/AddRepositoryFolder.svg" onclick="switchToAddRepositoryPanel()" class="add-repository-button" title="Add Repository">
        </div>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav col-md-5 hidden-xs">
            <li><img src="./assets/RightArrow.svg" class="right-arrow"></li>
            <li class="repo-name dropdown-toggle">
                <a href="#" id="repo-name" data-toggle="modal" data-target="#repo-modal">repository</a>
            </li>
            <li><img src="./assets/RightArrow.svg" class="right-arrow"></li>
            <li class="branch-name dropdown">
              <a class="dropdown-toggle" id="branch-name" data-toggle="dropdown">
                branch<span class="caret"></span>
              </a>
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
          </ul>

          <ul class="navbar-nav col-md-4 hidden-xs">
            <li class="upload"><i class="fa fa-cloud-upload fa-2x col-md-2" aria-hidden="true" style="color:white" onclick="pushToRemote()" title="Push"></i></li>
            <li class="download"><i class="fa fa-cloud-download fa-2x col-md-2" aria-hidden="true" style="color:white" onclick="pullFromRemote()" title="Pull"></i></li>
          </ul>

          <ul class="navbar-nav navbar-right hidden-xs">
            <li>
              <a class="btn btn-default btn-outline btn-circle"  id="avatar" data-toggle="collapse" href="#nav-collapse1" aria-expanded="false" aria-controls="nav-collapse1">Sign in</a>
            </li>
          </ul>
          <div class="collapse nav navbar-nav nav-collapse" id="nav-collapse1">
            <form class="navbar-form navbar-right form-inline" role="form">
              <div class="form-group">
                <label class="sr-only" for="Email">User name</label>
                <input type="text" class="form-control" id="Email1" placeholder="Email" autofocus required />
              </div>
              <div class="form-group">
                <label class="sr-only" for="Password">Password</label>
                <input type="password" class="form-control" id="Password1" placeholder="Password" required />
              </div>
              <button type="submit" class="btn btn-success" (click)="switchToMainPanel()">Sign in</button>
            </form>
          </div>

          <ul class="nav navbar-nav visible-xs">
            <li (click)="promptUserToAddRepository()"><a>&nbsp;&nbsp;add repository</a></li>
            <li class="dropdown">
              <a id="repo-name" data-toggle="modal" data-target="#repo-modal" href="#">
                &nbsp;&nbsp;repository
                <span class="caret"></span>
              </a>
            </li>
            <li class="dropdown">
              <a id="branch-name" data-toggle="dropdown" href="#">
                &nbsp;&nbsp;branch
                <span class="caret"></span>
              </a>
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
            <li class="dropdown">
              <a id="merge-name" onclick="getOtherBranches()" data-toggle="dropdown" href="#">
                &nbsp;&nbsp;update from
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" id="merge-dropdown" role="menu" >
              </ul>
            </li>
            <li class="upload" onclick="pushToRemote()"><a href="#">&nbsp;&nbsp;pull</a></li>
            <li class="download"onclick="pullFromRemote()"><a href="#">&nbsp;&nbsp;push</a></li>
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

  switchToMainPanel(): void {
    signInHead(collpaseSignPanel);
  }
}
