import plugins from './config/plugin'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
export default {
  input: 'src/main.ts',
  output: [
    {
      name: '<%= className%>',
      file: path.resolve('<%= publish_path %>', '<%= className %>.min.js'),
      format: 'iife',
      plugins: (()=>{
        if(process.env.NODE_ENV==='procution') return [terser({ compress: { drop_console: true } })]
        return[]
      })()
    }
  ],
  plugins: plugins,
  external: ['jquery', 'layer']
}
