/*global require*/
import Tooltip from './../../main.js';

document.addEventListener('DOMContentLoaded', function() {
	new Tooltip('content declared in js', {
		target: 'demo-tooltip-target-imperative',
		showOnHover: true,
		position: 'right'
	})
});

