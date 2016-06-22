import { Component } from '@angular/core';
import { FilePanelComponent } from './file.panel.component';
import { HeaderComponent } from './header.component';
import { AddRepositoryComponent } from './add.repository.component';

@Component({
  selector: 'my-app',
  template: `
    <app-header></app-header>
    <files></files>
  `,
  directives: [FilePanelComponent, HeaderComponent, AddRepositoryComponent]
})

export class AppComponent { }
