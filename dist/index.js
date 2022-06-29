"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chartjsPlugin_1 = __importDefault(require("./chartjsPlugin"));
const mermaidPlugin_1 = __importDefault(require("./mermaidPlugin"));
const namedBlockPlugin_1 = __importDefault(require("./namedBlockPlugin"));
const betterCodeBlocks = (md, options) => {
    md.use(chartjsPlugin_1.default);
    md.use(mermaidPlugin_1.default);
    md.use(namedBlockPlugin_1.default);
};
exports.default = betterCodeBlocks;
