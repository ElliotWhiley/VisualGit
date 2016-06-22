import { Component } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'file-panel',
  template: `
  <div class="left-panel">
    <div class="file" *ngFor="let file of files">
      <p>{{file}}</p>
    </div>
  </div>
  `,
  providers: [FileService]
})

export class FilePanelComponent {
  title: string = 'Files in project:';
  files: string[];

  constructor(private fileService: FileService) {
    this.files = fileService.getFiles();
  }
}
