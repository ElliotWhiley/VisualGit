import { Component } from "@angular/core";
import { FileService } from "../services/file.service";

@Component({
  selector: "file-panel",
  template: `
  <div class="file-panel" id="file-panel">
    <div class="file" *ngFor="let file of files">
      <p>{{file}}</p>
    </div>
  </div>
  `,
  providers: [FileService]
})

export class FilePanelComponent {

}
