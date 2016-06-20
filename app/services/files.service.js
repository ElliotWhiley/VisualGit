"use strict";
var FilesService = (function () {
    function FilesService() {
    }
    FilesService.prototype.getFiles = function () {
        return ['File1', 'File2', 'File3'];
    };
    return FilesService;
}());
exports.FilesService = FilesService;
