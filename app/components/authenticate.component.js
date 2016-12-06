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
        getUserInfo();
        console.log(username);
        console.log(password);
        switchToMainPanel();
    };
    return AuthenticateComponent;
}());
AuthenticateComponent = __decorate([
    core_1.Component({
        selector: "user-auth",
        template: "\n    <div class=\"authenticate\" id=\"authenticate\">\n      <form role=\"form\" style=\"text-align:center\">\n        <label>\n          <h1>User Authentication</h1>\n        </label>\n        <div class=\"form-group\">\n          <label for=\"name\">\n            <p>Please Enter Your Username/Email</p>\n          </label>\n          <input type=\"text\" name=\"username\" size=\"50\" id=\"username\">\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"name\">\n            <p>Password</p>\n          </label>\n          <input type=\"password\" name=\"password\" size=\"50\" id=\"password\"/>\n        </div>\n        <p>\n        <p>\n        <button class=\"button-clone\" (click)=\"switchToMainPanel()\">Log In</button>\n      </form>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [])
], AuthenticateComponent);
exports.AuthenticateComponent = AuthenticateComponent;
