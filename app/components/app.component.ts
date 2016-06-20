import { Component } from '@angular/core';
import { FilesComponent } from './files.component';

export class Test {
  name : string = 'initialised!';

  constructor(name: string) {
    this.name = name;
  }
}

@Component({
  selector: 'my-app',
  template: `
    <h1>Angular Is Working!!</h1>
    <files></files>
  `,
  //templateUrl: 'index.html',
  directives: [FilesComponent]
})

export class AppComponent { }

//var test = new Test('Elliot');
