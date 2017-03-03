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
var AuthenticateComponent = (function () {
    function AuthenticateComponent() {
    }
    AuthenticateComponent.prototype.switchToMainPanel = function () {
        signInPage(switchToMainPanel);
    };
    return AuthenticateComponent;
}());
AuthenticateComponent = __decorate([
    core_1.Component({
        selector: "user-auth",
        template: "\n    <div class=\"authenticate\" id=\"authenticate\">\n      <nav class=\"navbar navbar-inverse\" role=\"navigation\">\n        <div class=\"container-fluid\">\n          <button class=\"btn btn-inverse dropdown-toggle btn-sm navbar-btn\" id=\"color-scheme\" data-toggle=\"dropdown\">\n            color\n            <span class=\"caret\"></span>\n          </button>\n          <ul class=\"dropdown-menu\" id=\"color-dropdown\" role=\"menu\" aria-labelledby=\"branch-name\">\n            <li class=\"white\" onclick=\"changeColor('white')\">white</li>\n            <li class=\"default\" onclick=\"changeColor('default')\">default</li>\n          </ul>\n        </div>\n      </nav>\n      <form role=\"form\" style=\"text-align:center; margin-top:100px\">\n        <label>\n          <h1>VisualGit</h1>\n        </label>\n        <br><br>\n        <div class=\"input-group\" style=\"width:280px;\">\n          <span class=\"input-group-addon\" id=\"basic-addon1\">@</span>\n          <input id=\"username\" type=\"text\" class=\"form-control\" placeholder=\"username\" aria-describedby=\"basic-addon1\">\n        </div>\n        <br>\n\n        <div class=\"input-group\" style=\"width:280px;\">\n          <span class=\"input-group-addon\" id=\"basic-addon1\">@</span>\n          <input id=\"password\" type=\"password\" class=\"form-control\" placeholder=\"password\" aria-describedby=\"basic-addon1\">\n        </div>\n        <br>\n        <div>\n          <button type=\"submit\" style=\"width:280px;\" class=\"btn btn-success\" (click)=\"switchToMainPanel()\">Sign In</button>\n        </div>\n        <br>\n        <button type=\"submit\" style=\"width:280px;\" class=\"btn btn-primary\" onclick=\"switchToMainPanel()\">Continue without sign in</button>\n      </form>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], AuthenticateComponent);
exports.AuthenticateComponent = AuthenticateComponent;
