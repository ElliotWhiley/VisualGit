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
var repository_service_1 = require('../services/repository.service');
var graph_service_1 = require('../services/graph.service');
var HeaderComponent = (function () {
    function HeaderComponent(repositoryService, graphService) {
        this.repositoryService = repositoryService;
        this.graphService = graphService;
        this.repoName = 'Repo name';
        this.repoBranch = 'Repo branch';
    }
    HeaderComponent.prototype.cloneRepository = function () {
        console.log('test!!');
        drawGraph();
        this.repoName = this.repositoryService.getRepoName();
        this.repoBranch = this.repositoryService.getCurrentBranch();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: "\n    <div class=\"header\">\n      <button (click)=\"cloneRepository()\">+</button>\n      <p>{{repoName}}</p>\n      <p>{{repoBranch}}</p>\n    </div>\n  ",
            providers: [repository_service_1.RepositoryService, graph_service_1.GraphService]
        }), 
        __metadata('design:paramtypes', [repository_service_1.RepositoryService, graph_service_1.GraphService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
