import { Component } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { FilePanelComponent } from "./file.panel.component";
import { BodyPanelComponent } from "./body.panel.component";
import { FooterComponent } from "./footer.component";
import { AddRepositoryComponent } from "./add.repository.component";

@Component({
  selector: "my-app",
  template: `
    <app-header></app-header>
    <file-panel></file-panel>
    <body-panel></body-panel>
    <add-repository-panel></add-repository-panel>
    <app-footer></app-footer>
  `,
  directives: [HeaderComponent, FilePanelComponent, BodyPanelComponent, FooterComponent, AddRepositoryComponent]
})

export class AppComponent { }
