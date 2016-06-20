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
var files_service_1 = require('../services/files.service');
var FilesComponent = (function () {
    function FilesComponent(filesService) {
        this.filesService = filesService;
        this.title = 'Files in project:';
        this.files = filesService.getFiles();
    }
    FilesComponent = __decorate([
        core_1.Component({
            selector: 'files',
            template: "\n    <h2>FILES</h2>\n    {{title}}\n    <ul>\n      {{<li *ngFor=\"let file of files\">\n        {{file}}\n      </li>}}\n    </ul>\n  ",
            providers: [files_service_1.FilesService]
        }), 
        __metadata('design:paramtypes', [files_service_1.FilesService])
    ], FilesComponent);
    return FilesComponent;
}());
exports.FilesComponent = FilesComponent;
