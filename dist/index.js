"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const betterCodeBlocks = (md, options) => {
    const proxy = (tokens, idx, opts, env, self) => self.render(tokens, opts, env);
    const defaultRenderer = md.renderer.rules.fence || proxy;
    const mermaidRegex = /^mermaid/;
    const nameRegex = /^(\w+):(.+)$/;
    md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
        const info = tokens[idx].info;
        if (mermaidRegex.test(info)) {
            if (nameRegex.test(info)) {
                const [_, lang, title] = info.match(nameRegex) || [];
                tokens[idx].info = lang;
                tokens[idx].attrPush(['class', 'mermaid']);
                const rendered = [
                    '<div class="named-code-block">',
                    '  <div class="named-code-block-title">',
                    md.utils.escapeHtml(title),
                    '  </div>',
                    defaultRenderer(tokens, idx, opts, env, self),
                    '</div>',
                ].join('\n');
                return rendered;
            }
            else {
                tokens[idx].attrPush(['class', 'mermaid']);
                const rendered = [
                    defaultRenderer(tokens, idx, opts, env, self),
                ].join('\n');
                return rendered;
            }
        }
        else if (nameRegex.test(info)) {
            const [_, lang, title] = info.match(nameRegex) || [];
            tokens[idx].info = lang;
            const rendered = [
                '<div class="named-code-block">',
                '  <div class="named-code-block-title">',
                md.utils.escapeHtml(title),
                '  </div>',
                defaultRenderer(tokens, idx, opts, env, self),
                '</div>',
            ].join('\n');
            return rendered;
        }
        else {
            return defaultRenderer(tokens, idx, opts, env, self);
        }
    };
    /*
    const renderer = md.renderer.render;
    md.renderer.render = function (tokens, opts, env) {
       return `${renderer.apply(md.renderer, [tokens, opts, env])}
 <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
 <script>
    mermaid.initialize({ startOnLoad: true });
 </script>`;
    }; */
};
exports.default = betterCodeBlocks;
