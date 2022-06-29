import { PluginWithOptions } from 'markdown-it';
import chartjsPlugin from './chartjsPlugin';
import mermaidPlugin from './mermaidPlugin';
import namedPlugin from './namedBlockPlugin';

type Opts = {};

const betterCodeBlocks: PluginWithOptions<Opts> = (md, options) => {
   md.use(chartjsPlugin);
   md.use(mermaidPlugin);
   md.use(namedPlugin);
};

export default betterCodeBlocks;
