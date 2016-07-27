"use strict";
var FileService = (function () {
    function FileService() {
    }
    FileService.prototype.getFiles = function () {
        return ["src/views/cool-website.html", "src/stylesheets/super-styles.css", "src/scripts/main.js"];
    };
    return FileService;
}());
exports.FileService = FileService;
