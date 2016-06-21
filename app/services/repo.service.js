"use strict";
var RepoService = (function () {
    function RepoService() {
    }
    RepoService.prototype.getRepoName = function () {
        return ['File1', 'File2', 'File3'];
    };
    RepoService.prototype.getCurrentBranch = function () {
        return ['File1', 'File2', 'File3'];
    };
    return RepoService;
}());
exports.RepoService = RepoService;
