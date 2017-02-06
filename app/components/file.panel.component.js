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
var FilePanelComponent = (function () {
    function FilePanelComponent() {
    }
    return FilePanelComponent;
}());
FilePanelComponent = __decorate([
    core_1.Component({
        selector: "file-panel",
        template: "\n  <div class=\"file-panel\" id=\"file-panel\">\n\n    <div class=\"modified-files-header\" id=\"modified-files-header\">\n      <p class=\"select-all-message\" id=\"select-all-message\">Select all</p>\n      <input onClick=\"setAllCheckboxes(this);\" type=\"checkbox\" class=\"select-all-checkbox\" id=\"select-all-checkbox\"/>\n    </div>\n\n    <div class=\"files-changed\" id=\"files-changed\">\n      <p class=\"modified-files-message\" id=\"modified-files-message\">Your modified files will appear here</p>\n      <div class=\"file\" *ngFor=\"let file of files\">\n        <p>{{file}}</p>\n      </div>\n    </div>\n\n    <div class=\"commit-panel\" id=\"commit-panel\">\n      <textarea placeholder=\"Describe your changes here...\" class=\"commit-message-input\" id=\"commit-message-input\"></textarea>\n      <button class=\"commit-button\" id=\"commit-button\">Commit</button>\n    </div>\n\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], FilePanelComponent);
exports.FilePanelComponent = FilePanelComponent;
