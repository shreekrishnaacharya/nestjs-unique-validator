"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.findOne = exports.findAllByPage = exports.PageSearch = void 0;
const decorators_1 = require("./decorators");
Object.defineProperty(exports, "PageSearch", { enumerable: true, get: function () { return decorators_1.PageSearch; } });
const models_1 = require("./models");
Object.defineProperty(exports, "Page", { enumerable: true, get: function () { return models_1.Page; } });
Object.defineProperty(exports, "findAllByPage", { enumerable: true, get: function () { return models_1.findAllByPage; } });
Object.defineProperty(exports, "findOne", { enumerable: true, get: function () { return models_1.findOne; } });
