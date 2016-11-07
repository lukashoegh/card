"use strict";
var Option = (function () {
    function Option(value) {
        if (value === undefined) {
            this.valueIsPresent = false;
            this.value = null;
        }
        else {
            this.valueIsPresent = true;
            this.value = value;
        }
    }
    Option.prototype.getValue = function () {
        if (this.valueIsPresent)
            return this.value;
        else
            throw new ReferenceError("Tried to access value of empty option");
    };
    return Option;
}());
exports.__esModule = true;
exports["default"] = Option;
