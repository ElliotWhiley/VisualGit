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
var diff_panel_component_1 = require("./diff.panel.component");
var graph_panel_component_1 = require("./graph.panel.component");
var BodyPanelComponent = (function () {
    function BodyPanelComponent() {
    }
    return BodyPanelComponent;
}());
BodyPanelComponent = __decorate([
    core_1.Component({
        selector: "body-panel",
        template: "\n  <div class=\"body-panel\" id=\"body-panel\">\n    <diff-panel></diff-panel>\n    <graph-panel></graph-panel>\n  </div>\n  ",
        directives: [diff_panel_component_1.DiffPanelComponent, graph_panel_component_1.GraphPanelComponent]
    }),
    __metadata("design:paramtypes", [])
], BodyPanelComponent);
exports.BodyPanelComponent = BodyPanelComponent;
