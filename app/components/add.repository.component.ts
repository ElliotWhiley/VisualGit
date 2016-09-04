import { Component } from "@angular/core";

@Component({
  selector: "add-repository-panel",
  template: `
    <div class="add-repository-panel" id="add-repository-panel">
      <div class=title>
        <h1>Clone from internet</h1>
      </div>

      <div class=block>
        <div class=left>
          <p>URL to clone from</p>
        </div>
        <div class=right>
        <input type="text" oninput="updateLocalPath()" name="repositoryRemote" size="50" id="repoClone" placeholder="https://github.com/user/repository.git"/>
        </div>
      </div>

      <div class=block>
        <div class=left>
          <p>File location to save to</p>
        </div>
        <div class=right>
          <input type="text" name="repositoryLocal" size="50" id="repoSave"/>
          <button class="button-clone" (click)="addRepository()">Clone</button>
        </div>
      </div>


      <div class=title>
        <h1 class="open-local-repo">Open local repository</h1>
      </div>

      <div class=block>
        <div class=left>
          <p>Location of existing repository</p>
        </div>
        <div class=right>
          <input type="text" name="repositoryLocal" size="50" id="repoOpen"/>
          <button class="button-open" (click)="openRepository()">Open</button>
        </div>
      </div>
    </div>
  `
})

export class AddRepositoryComponent {

  addRepository(): void {
    downloadRepository();
    switchToMainPanel();
  }

  openRepository(): void {
    openRepository();
    switchToMainPanel();
  }
}
