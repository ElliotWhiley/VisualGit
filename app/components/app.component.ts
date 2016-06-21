import { Component } from '@angular/core';
import { FilesComponent } from './files.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'my-app',
  template: `
    <app-header></app-header>

    <h1>Angular Is Working!!</h1>
    <files></files>
  `,
  // templateUrl: 'index.html',
  directives: [FilesComponent, HeaderComponent]
})

export class AppComponent { }
