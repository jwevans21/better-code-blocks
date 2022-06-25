import { PluginWithOptions, Options } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

type Opts = {};

const betterCodeBlocks: PluginWithOptions<Opts> = (md, options) => {
   const proxy: Renderer.RenderRule = (
      tokens: Token[],
      idx: number,
      opts: Options,
      env: any,
      self: Renderer
   ) => self.render(tokens, opts, env);

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

export default betterCodeBlocks;
