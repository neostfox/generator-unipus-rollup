import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import path from 'path';
const plugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    resolve({
        jsnext: true,
        browser: true,
    }),
    commonjs(),
    postcss({
        plugins: [simplevars(), nested(), cssnext({ warnForDuplicates: false }), cssnano()],
        extensions: ['.css'],
        extract: path.resolve(__dirname, 'dist', 'style.css'),
        minimize: true,
    }),
    eslint({
        exclude: ['src/features/*/*.css', 'dist/**.*'],
    }),
    typescript(),
    babel({
        exclude: 'node_modules/**',
        extensions: ['tsx', 'ts', 'js', 'jsx'],
        runtimeHelpers: true,
    }),
    ,
];
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    plugins.push(
        serve({
            open: true, // 是否打开浏览器
            openPage: '/',
            contentBase: ['public', 'dist'],
            historyApiFallback: false, // Set to true to return index.html instead of 404
            host: 'localhost',
            port: 10001,
        })
    );
    plugins.push(livereload({ watch: 'dist' }));
}
export default plugins;
