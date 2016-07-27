"use strict";
var RepositoryService = (function () {
    function RepositoryService() {
    }
    RepositoryService.prototype.getRepoName = function () {
        return "Nice Repo";
    };
    RepositoryService.prototype.getCurrentBranch = function () {
        return "Nice Branch";
    };
    return RepositoryService;
}());
exports.RepositoryService = RepositoryService;
