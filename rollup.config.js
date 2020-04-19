import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import html from '@rollup/plugin-html';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import tailwind from 'tailwindcss';
import purgecss from '@fullhuman/postcss-purgecss';

const isProd = process.env.BUILD === 'production';

const babelPlugin = babel({
	include: ['src/*', 'src/**/*'],
	presets: [
		'@babel/preset-modules',
		[
			'@babel/preset-react',
			{
				pragma: 'h',
				pragmaFrag: 'Fragment',
			},
		],
	],
});

const postcssPlugin = postcss({
	extract: isProd,
	minimize: isProd,
	plugins: [
		tailwind,
		isProd &&
			purgecss({
				content: ['./src/client/**/*.jsx'],
				defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
			}),
	],
});

export default {
	input: 'src/client/index.js',
	output: {
		dir: 'build',
		sourcemap: !isProd,
		name: 'app',
		entryFileNames: isProd ? '[name]-[hash].js' : '[name].js',
		chunkFileNames: isProd ? '[name]-[hash].js' : '[name].js',
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		babelPlugin,
		postcssPlugin,
		html({ publicPath: '/', title: 'goodmeal' }),
		!isProd && livereload(),
		isProd && terser({ ecma: 8, safari10: true }),
	],
};
