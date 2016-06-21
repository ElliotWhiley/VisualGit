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
var core_1 = require('@angular/core');
var repo_service_1 = require('../services/repo.service');
var HeaderComponent = (function () {
    function HeaderComponent() {
        this.repoName = 'Repo name';
        this.repoBranch = 'Repo branch';
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: "\n    <div class=\"header\">\n      <button onclick=\"downloadRepo()\">+</button>\n      <p>{{repoName}}</p>\n      <p>{{repoBranch}}</p>\n    </div>\n  ",
            providers: [repo_service_1.RepoService]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
