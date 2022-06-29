import { PluginWithOptions, Options } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

const namedPlugin: PluginWithOptions<null> = (md, options) => {
   const proxy: Renderer.RenderRule = (
      tokens: Token[],
      idx: number,
      opts: Options,
      env: any,
      self: Renderer
   ) => self.render(tokens, opts, env);

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
      } else {
         return defaultFenceRenderer(tokens, idx, opts, env, self);
      }
   };
};

export default namedPlugin;