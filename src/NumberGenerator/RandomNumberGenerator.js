"use strict";
var RandomNumberGenerator = (function () {
    function RandomNumberGenerator(prng) {
        this.prng = prng;
    }
    /* istanbul ignore next */
    RandomNumberGenerator.prototype.getInteger = function (max) {
        return Math.floor(this.prng() * max);
    };
    return RandomNumberGenerator;
}());
exports.__esModule = true;
exports["default"] = RandomNumberGenerator;
