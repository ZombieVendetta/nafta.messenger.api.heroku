"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomReuseStrategy = (function () {
    function CustomReuseStrategy() {
    }
    CustomReuseStrategy.prototype.shouldDetach = function (route) {
        return false;
    };
    CustomReuseStrategy.prototype.store = function (route, handle) { };
    CustomReuseStrategy.prototype.shouldAttach = function (route) {
        return false;
    };
    CustomReuseStrategy.prototype.retrieve = function (route) {
        return false;
    };
    CustomReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        var name = future.component && future.component.name;
        return future.routeConfig === curr.routeConfig && name !== 'ChatComponent';
    };
    return CustomReuseStrategy;
}());
exports.CustomReuseStrategy = CustomReuseStrategy;
//# sourceMappingURL=route-reuse.strategy.js.map