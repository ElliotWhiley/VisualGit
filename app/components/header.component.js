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
var repository_service_1 = require("../services/repository.service");
var graph_service_1 = require("../services/graph.service");
var HeaderComponent = (function () {
    function HeaderComponent() {
        this.repoName = "Repo name";
        this.repoBranch = "Repo branch";
    }
    HeaderComponent.prototype.promptUserToAddRepository = function () {
        switchToAddRepositoryPanel();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: "app-header",
        template: "\n    <nav class=\"navbar navbar-inverse\" role=\"navigation\">\n      <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n        </div>\n        <div class=\"collapse navbar-collapse\" id=\"navbar\">\n          <ul class=\"nav navbar-nav\">\n            <li><img src=\"./assets/AddRepositoryFolder.svg\" (click)=\"promptUserToAddRepository()\" class=\"add-repository-button\" title=\"Add Repository\"></li>\n            <li class=\"repo-name dropdown\">\n              <button class=\"btn btn-inverse dropdown-toggle btn-sm\" id=\"repo-name\" data-toggle=\"modal\" data-target=\"#repo-modal\">\n                repository\n                <span class=\"caret\"></span>\n              </button>\n            </li>\n            <li class=\"branch-name dropdown\">\n              <button class=\"btn btn-inverse dropdown-toggle btn-sm\" id=\"branch-name\" onclick=\"getAllBranches()\" data-toggle=\"dropdown\">\n                branch\n                <span class=\"caret\"></span>\n              </button>\n              <ul class=\"dropdown-menu\" id=\"branch-dropdown\" role=\"menu\" aria-labelledby=\"branch-name\">\n                <li role=\"presentation\" id=\"create-branch\">\n                  <div class=\"input-group menuitem\">\n                    <input type=\"text\" id=\"branchName\" class=\"form-control\" placeholder=\"Search or create branch\">\n                    <span class=\"input-group-btn\">\n                      <button class=\"btn btn-default\" type=\"button\" onclick=\"createBranch()\">OK</button>\n                    </span>\n                  </div>\n                </li>\n              </ul>\n            </li>\n            <li class=\"merge dropdown\">\n              <button href=\"#\" class=\"btn btn-inverse dropdown-toggle btn-sm\" id=\"merge-name\" onclick=\"getOtherBranches()\" data-toggle=\"dropdown\">\n                update from\n                <span class=\"caret\"></span>\n              </button>\n              <ul class=\"dropdown-menu\" id=\"merge-dropdown\" role=\"menu\" >\n              </ul>\n            </li>\n            <li class=\"upload\"><i class=\"fa fa-cloud-upload fa-2x\" aria-hidden=\"true\" style=\"color:white\" onclick=\"pushToRemote()\" title=\"Push\"></i></li>\n            <li class=\"download\"><i class=\"fa fa-cloud-download fa-2x\" aria-hidden=\"true\" style=\"color:white\" onclick=\"pullFromRemote()\" title=\"Pull\"></i></li>\n          </ul>\n          <ul class=\"navbar-nav navbar-right\">\n            <li>\n              <a id=\"avater\" class=\"dropdown-toggle\">\n                <i class=\"fa fa-github fa-2x\" aria-hidden=\"true\" style=\"color:white\"></i>\n                <span class=\"caret\"></span>\n              </a>\n              <ul class=\"dropdown-menu\" id=\"user-dropdown\" role=\"menu\" >\n              </ul>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n    <div id=\"modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">Info</h4>\n          </div>\n          <div class=\"modal-body\" id=\"modal-text-box\">\n            unset\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div id=\"repo-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <ul class=\"list-group\"id=\"repo-dropdown\" role=\"menu\" aria-labelledby=\"repo-name\">\n          </ul>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-primary disabled\" id=\"cloneButton\" onclick=\"cloneRepo()\">Clone</button>\n          </div>\n        </div><!-- /.modal-content -->\n      </div><!-- /.modal-dialog -->\n    </div>\n  ",
        providers: [repository_service_1.RepositoryService, graph_service_1.GraphService]
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
