"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var GraphPanelComponent = (function () {
    function GraphPanelComponent() {
    }
    GraphPanelComponent.prototype.mergeBranches = function () {
        var p1 = document.getElementById('fromMerge').innerHTML;
        mergeCommits(p1);
    };
    GraphPanelComponent.prototype.rebaseBranches = function () {
        var p1 = document.getElementById('fromRebase').innerHTML;
        var p2 = document.getElementById('toRebase').innerHTML;
        rebaseCommits(p1, p2);
    };
    return GraphPanelComponent;
}());
GraphPanelComponent = __decorate([
    core_1.Component({
        selector: "graph-panel",
        template: "\n  <div class=\"graph-panel\" id=\"graph-panel\">\n    <div class=\"network\" id=\"my-network\">\n    </div>\n    <ul class=\"dropdown-menu\" role=\"menu\" id=\"branchOptions\">\n      <li><a tabindex=\"0\" href=\"#\">Checkout this branch</a></li>\n      <li class=\"dropdown-submenu\">\n        <a tabindex=\"0\" href=\"#\">Merge from</a>\n        <ul class=\"dropdown-menu\" role=\"menu\" id=\"otherBranches\"></ul>\n      </li>\n    </ul>\n    <div class=\"modal fade\" id=\"mergeModal\" tabindex=\"-1\" role=\"dialog\">\n      <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n            <h4 class=\"modal-title\">Merge branches</h4>\n          </div>\n          <div class=\"modal-body\">\n            <p id=\"mergeModalBody\"></p>\n          </div>\n          <p class=\"invisible\" id=\"fromMerge\"></p>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"mergeBranches()\" data-dismiss=\"modal\">Yes</button>\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n          </div>\n        </div><!-- /.modal-content -->\n      </div><!-- /.modal-dialog -->\n    </div>\n    <div class=\"modal fade\" id=\"rebaseModal\" tabindex=\"-1\" role=\"dialog\">\n      <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n            <h4 class=\"modal-title\">Rebase branches</h4>\n          </div>\n          <div class=\"modal-body\">\n            <p id=\"rebaseModalBody\"></p>\n          </div>\n          <p class=\"invisible\" id=\"fromRebase\"></p>\n          <p class=\"invisible\" id=\"toRebase\"></p>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"mergeBranches()\" data-dismiss=\"modal\">Yes</button>\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n          </div>\n        </div><!-- /.modal-content -->\n      </div><!-- /.modal-dialog -->\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], GraphPanelComponent);
exports.GraphPanelComponent = GraphPanelComponent;
