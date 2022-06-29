import { PluginWithOptions, Options } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

const mermaidPlugin: PluginWithOptions<null> = (md, options) => {
   const proxy: Renderer.RenderRule = (
      tokens: Token[],
      idx: number,
      opts: Options,
      env: any,
      self: Renderer
   ) => self.render(tokens, opts, env);

   const defaultFenceRenderer = md.renderer.rules.fence || proxy;

   const mermaidRegex = /^mermaid/;

   md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
      const info = tokens[idx].info;

      if (mermaidRegex.test(info)) {
         const content = tokens[idx].content;
         const id = `mermaid-${Date.now()}-${idx}`;
         const rendered = [
            `<div id="${id}" class="mermaid language-mermaid">`,
            '  <div class="mermaid-code">',
            `     ${md.utils.escapeHtml(content)}</div>`,
            `  <div id="${id}-final" class='mermaid-svg'></div>`,
            '</div>',
         ].join('\n');
         return rendered;
      } else {
         return defaultFenceRenderer(tokens, idx, opts, env, self);
      }
   };

   const defaultRenderer = md.renderer.render;
   md.renderer.render = function (tokens, options, env) {
      for (const token of tokens) {
         if (token.type === 'fence' && mermaidRegex.test(token.info)) {
            return `${defaultRenderer(tokens, options, env)}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.1.3/mermaid.min.js" integrity="sha512-E/owfVh8/U1xwhvIT4HSI064DRc1Eo/xf7AYax84rt9gVqA8tc/JNH/lvTl1tuw9PUHQIMGUtObkjYkgRjFqAA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://unpkg.com/@jwevans/better-code-blocks/browser/mermaid.js"></script>`;
         }
      }
      return defaultRenderer(tokens, options, env);
   };
};

export default mermaidPlugin;
