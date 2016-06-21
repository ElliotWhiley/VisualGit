import { Component } from '@angular/core';
import { FilesComponent } from './files.component';
import { HeaderComponent } from './header.component';
import { AddRepositoryComponent } from './add.repository.component';

@Component({
  selector: 'my-app',
  template: `
    <app-header></app-header>

    <h1>Angular Is Working!!</h1>
    <files></files>
    <add-repository id="add-repository"></add-repository>
  `,
  // templateUrl: 'index.html',
  directives: [FilesComponent, HeaderComponent, AddRepositoryComponent]
})

export class AppComponent { }
