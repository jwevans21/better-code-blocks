"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namedPlugin = (md, options) => {
    const proxy = (tokens, idx, opts, env, self) => self.render(tokens, opts, env);
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;
    const namedRegex = /^(\w+):(\w+)/;
    md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
        const info = tokens[idx].info;
        if (namedRegex.test(info)) {
            const [_, lang, name] = namedRegex.exec(info) || [];
            tokens[idx].info = lang;
            const rendered = [
                `<div class="named-code-block">`,
                `  <div class="named-code-block-title">${name}</div>`,
                `  ${defaultFenceRenderer(tokens, idx, opts, env, self)}`,
                '</div>',
            ].join('\n');
            return rendered;
        }
        else {
            return defaultFenceRenderer(tokens, idx, opts, env, self);
        }
    };
};
exports.default = namedPlugin;
