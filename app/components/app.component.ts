import { Component } from '@angular/core';
import { FilesComponent } from './files.component';
import { HeaderComponent } from './header.component';
import { AddRepositoryComponent } from './add.repository.component';

@Component({
  selector: 'my-app',
  template: `
    <app-header></app-header>


  `,
  directives: [FilesComponent, HeaderComponent, AddRepositoryComponent]
})

export class AppComponent { }
