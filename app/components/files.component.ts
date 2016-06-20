import { Component } from '@angular/core';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'files',
  template: `
    <h2>FILES</h2>
    {{title}}
    <ul>
      {{<li *ngFor="let file of files">
        {{file}}
      </li>}}
    </ul>
  `,
  providers: [FilesService]
})

export class FilesComponent   {
  title: string = 'Files in project:';
  files: string[];
  //filesService: FilesService;

  constructor(private filesService: FilesService) {
    this.files = filesService.getFiles();
  }
}
