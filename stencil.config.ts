import { Config } from '@stencil/core';
import { less } from '@stencil/less';

export const config: Config = {
	namespace: 'aann',
	copy: [
		{ src: 'pages/*.html', dest: './' },
	],
	outputTargets: [
		{
			type: 'www',
			dir: 'dist',
		},
	],
	plugins: [
		less(),
	],
	globalStyle: 'src/globals/shared.less'
};