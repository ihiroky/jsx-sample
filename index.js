"use strict";
exports.__esModule = true;
exports.MyJSX = {
    createElement: function (tagName, attributes) {
        var content = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            content[_i - 2] = arguments[_i];
        }
        var attrString = '';
        for (var key in attributes) {
            attrString += " " + key + "=\"" + attributes[key] + "\"";
        }
        return "<" + tagName + " " + attrString + ">" + content.join('') + "</" + tagName + ">";
    }
};
exports["default"] = exports.MyJSX;
