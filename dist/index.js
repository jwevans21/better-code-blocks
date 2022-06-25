"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const betterCodeBlocks = (md, options) => {
    const proxy = (tokens, idx, opts, env, self) => self.render(tokens, opts, env);
    const defaultRenderer = md.renderer.rules.fence || proxy;
    const nameRegex = /^(\w+):(.+)$/;
    md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
        const info = tokens[idx].info;
        if (nameRegex.test(info)) {
            const [_, lang, title] = info.match(nameRegex) || [];
            tokens[idx].info = lang;
            const rendered = `<div class="named-code-block">
<div class="named-code-block-title">${title}</div>
${defaultRenderer(tokens, idx, opts, env, self)}</div>`;
            return rendered;
        }
        return defaultRenderer(tokens, idx, opts, env, self);
    };
};
exports.default = betterCodeBlocks;
