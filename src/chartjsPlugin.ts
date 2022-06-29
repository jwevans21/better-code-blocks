import { PluginWithOptions, Options } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

const chartjsPlugin: PluginWithOptions<null> = (md, options) => {
   const proxy: Renderer.RenderRule = (
      tokens: Token[],
      idx: number,
      opts: Options,
      env: any,
      self: Renderer
   ) => self.render(tokens, opts, env);

   const defaultFenceRenderer = md.renderer.rules.fence || proxy;

   const chartjsRegex = /^(chart|chartjs)$/;

   md.renderer.rules.fence = function (tokens, idx, opts, env, self) {
      const info = tokens[idx].info;

      if (chartjsRegex.test(info)) {
         const id = `${Date.now().toString()}-${idx}`;
         const content = tokens[idx].content;
         const rendered = [
            `<canvas id="${id}" class="chartjs language-chartjs">`,
            `  ${content}`,
            '</canvas>',
         ].join('\n');
         return rendered;
      } else {
         return defaultFenceRenderer(tokens, idx, opts, env, self);
      }
   };

   const defaultRenderer = md.renderer.render;
   md.renderer.render = function (tokens, options, env) {
      for (const token of tokens) {
         if (token.type === 'fence' && chartjsRegex.test(token.info)) {
            return `${defaultRenderer.apply(md.renderer, [
               tokens,
               options,
               env,
            ])}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js" integrity="sha512-sW/w8s4RWTdFFSduOTGtk4isV1+190E/GghVffMA9XczdJ2MDzSzLEubKAs5h0wzgSJOQTRYyaz73L3d6RtJSg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://unpkg.com/@jwevans/better-code-blocks/browser/chartjs.js"></script>`;
         }
      }

      return defaultRenderer.apply(md.renderer, [tokens, options, env]);
   };
};

export default chartjsPlugin;
