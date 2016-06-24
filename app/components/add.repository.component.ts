import { Component } from '@angular/core';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'add-repository-panel',
  template: `
    <div class="add-repository-panel" id="add-repository-panel">
      <h1>Clone Repository</h1>
      <p>URL</p>
      <input type="text" name="repositoryUrl" size="50" id="repository-url"/>
      <button (click)="addRepository()">Clone</button>
    </div>
  `
})

export class AddRepositoryComponent {
  repositoryUrl: string;

  addRepository(): void {
    console.log('adding repository!!');
    downloadRepository();
    switchToMainPanel();
  }
}
