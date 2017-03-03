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
var header_component_1 = require("./header.component");
var file_panel_component_1 = require("./file.panel.component");
var body_panel_component_1 = require("./body.panel.component");
var footer_component_1 = require("./footer.component");
var add_repository_component_1 = require("./add.repository.component");
var authenticate_component_1 = require("./authenticate.component");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n    <user-auth></user-auth>\n    <app-header></app-header>\n    <file-panel></file-panel>\n    <body-panel></body-panel>\n    <add-repository-panel></add-repository-panel>\n    <app-footer></app-footer>\n  ",
        directives: [header_component_1.HeaderComponent, file_panel_component_1.FilePanelComponent, body_panel_component_1.BodyPanelComponent, footer_component_1.FooterComponent, add_repository_component_1.AddRepositoryComponent, authenticate_component_1.AuthenticateComponent]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
