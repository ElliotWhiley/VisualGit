import { Component } from "@angular/core";

@Component({
  selector: "diff-panel",
  template: `
  <div class="diff-panel" id="diff-panel">
    <div class="diff-panel-body" id="diff-panel-body"></div>
    <div class="diff-panel-minimise" id="diff-panel-minimise">
      <img src="./assets/Minimise.svg" class="minimise">
    </div>
  </div>
  `
})

export class DiffPanelComponent {

}
