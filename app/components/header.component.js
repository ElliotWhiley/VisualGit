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
        template: "\n    <nav class=\"navbar navbar-inverse\" role=\"navigation\">\n      <div class=\"container-fluid\">\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse\">\n          <ul class=\"nav navbar-nav\">\n            <li><img src=\"./assets/AddRepositoryFolder.svg\" (click)=\"promptUserToAddRepository()\" class=\"add-repository-button\" title=\"Add Repository\"></li>\n            <li><img src=\"./assets/RightArrow.svg\" class=\"right-arrow\" href=\"#\"></li>\n            <li class=\"dropdown repo-name\">\n              <a href=\"#\" class=\"dropdown-toggle\" id=\"repo-name\" data-toggle=\"dropdown\">\n                Repository\n                <span class=\"caret\"></span>\n              </a>\n              <ul class=\"dropdown-menu\" id=\"repo-dropdown\" role=\"menu\">\n                <li><a href=\"#\">WTF</a></li>\n              </ul>\n            </li>\n            <li><img src=\"./assets/RightArrow.svg\" class=\"right-arrow\" href=\"#\"></li>\n            <li class=\"dropdown\">\n              <a href=\"#\" class=\"dropdown-toggle\" id=\"branch-name\" onclick=\"getAllBranches()\" data-toggle=\"dropdown\">\n                Branch\n                <span class=\"caret\"></span>\n              </a>\n              <ul class=\"dropdown-menu\" id=\"branch-dropdown\" role=\"menu\" >\n                <li role=\"presentation\" id=\"create-branch\">\n                  <div class=\"input-group\">\n                    <input type=\"text\" id=\"branchName\" class=\"form-control\" placeholder=\"Search or create branch\">\n                    <span class=\"input-group-btn\">\n                      <button class=\"btn btn-default\" type=\"button\" onclick=\"createBranch()\">OK</button>\n                    </span>\n                  </div>\n                </li>\n              </ul>\n            </li>\n            <li>\n              <a href=\"#\" class=\"dropdown-toggle btn btn-inverse\" id=\"merge-name\" onclick=\"getOtherBranches()\" style=\"font-size : 20px\" data-toggle=\"dropdown\">\n                Update From\n                <span class=\"caret\"></span>\n              </a>\n              <ul class=\"dropdown-menu\" id=\"merge-dropdown\" role=\"menu\" >\n              </ul>\n            </li>\n          </ul>\n          <img src=\"./assets/Pull.svg\" class=\"pull-button\" onclick=\"pullFromRemote()\" title=\"Pull\">\n          <img src=\"./assets/Push.svg\" class=\"push-button\" onclick=\"pushToRemote()\" title=\"Push\">\n          <ul class=\"navbar-nav navbar-right\">\n            <li><img id=\"avater\" height=\"50\" width=\"50\" src=\"./assets/AddRepositoryFolder.svg\" align=\"right\"></li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n    <div id=\"modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">Info</h4>\n          </div>\n          <div class=\"modal-body\" id=\"modal-text-box\">\n            unset\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
        providers: [repository_service_1.RepositoryService, graph_service_1.GraphService]
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
