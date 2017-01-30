import { Component } from "@angular/core";

@Component({
  selector: "graph-panel",
  template: `
  <div class="graph-panel" id="graph-panel">
    <div class="network" id="my-network">
    </div>
    <ul class="dropdown-menu" role="menu" id="branchOptions">
      <li><a tabindex="0" href="#">Checkout this branch</a></li>
      <li class="dropdown-submenu">
        <a tabindex="0" href="#">Merge from</a>
        <ul class="dropdown-menu" role="menu" id="otherBranches"></ul>
      </li>
    </ul>
    <div class="modal fade" id="mergeModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Merge branches</h4>
          </div>
          <div class="modal-body">
            <p id="mergeModalBody"></p>
          </div>
          <p class="invisible" id="fromMerge"></p>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="mergeBranches()" data-dismiss="modal">Yes</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
  </div>
  `
})

export class GraphPanelComponent {
  mergeBranches(): void {
    let p1 = document.getElementById('fromMerge').innerHTML;
    console.log(p1 + '   -----------------');
    mergeCommits(p1);
  }
}
