import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FilePanelComponent } from './file.panel.component';
import { GraphPanelComponent } from './graph.panel.component';
import { AddRepositoryComponent } from './add.repository.component';

@Component({
  selector: 'my-app',
  template: `
    <app-header></app-header>
    <file-panel></file-panel>
    <graph-panel></graph-panel>
  `,
  directives: [HeaderComponent, FilePanelComponent, GraphPanelComponent, AddRepositoryComponent]
})

export class AppComponent { }
