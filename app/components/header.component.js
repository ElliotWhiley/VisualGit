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
        template: "\n    <nav class=\"navbar navbar-inverse\" role=\"navigation\">\n      <div class=\"container-fluid\">\n        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse\">\n          <ul class=\"nav navbar-nav\">\n            <li><img src=\"./assets/AddRepositoryFolder.svg\" (click)=\"promptUserToAddRepository()\" class=\"add-repository-button\" title=\"Add Repository\"></li>\n            <li><img src=\"./assets/RightArrow.svg\" class=\"right-arrow\" href=\"#\"></li>\n            <li class=\"dropdown repo-name\">\n              <a href=\"#\" class=\"dropdown-toggle\" id=\"repo-name\" data-toggle=\"dropdown\">\n                Repository\n                <span class=\"caret\"></span>\n              </a>\n              <ul class=\"dropdown-menu\" role=\"menu\">\n                <li><a href=\"#\">jmeter</a></li>\n              </ul>\n            </li>\n            <li><img src=\"./assets/RightArrow.svg\" class=\"right-arrow\" href=\"#\"></li>\n            <li class=\"dropdown\">\n              <a href=\"#\" class=\"dropdown-toggle\" id=\"branch-name\" data-toggle=\"dropdown\">\n                Branch\n                <span class=\"caret\"></span>\n              </a>\n              <ul class=\"dropdown-menu\" role=\"menu\" >\n                <li role=\"presentation\">\n                  <div class=\"input-group\">\n                    <input type=\"text\" id=\"branchName\" class=\"form-control\" placeholder=\"Search or create branch\">\n                    <span class=\"input-group-btn\">\n                      <button class=\"btn btn-default\" type=\"button\" onclick=\"createBranch()\">OK</button>\n                    </span>\n                  </div>\n                </li>\n              </ul>\n            </li>\n          </ul>\n          <img src=\"./assets/Pull.svg\" class=\"pull-button\" onclick=\"pullFromRemote()\" title=\"Pull\">\n          <img src=\"./assets/Push.svg\" class=\"push-button\" onclick=\"pushToRemote()\" title=\"Push\">\n          <ul class=\"navbar-nav navbar-right\">\n            <li><img id=\"avater\" height=\"70\" width=\"70\" src=\"./assets/AddRepositoryFolder.svg\" align=\"right\"></li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n    <div id=\"modal\" class=\"modal\">\n      <div class=\"modal-content\">\n        <img src=\"./assets/Close.svg\" class=\"close\">\n        <p id=\"modal-text-box\">unset</p>\n      </div>\n    </div>\n  ",
        providers: [repository_service_1.RepositoryService, graph_service_1.GraphService]
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
