/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import Tooltip from './../main';
import Viewport from 'o-viewport';

describe("Tooltip", () => {

	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
		if (Tooltip._tooltips) {
			Tooltip._tooltips.forEach((tooltip) => {
				tooltip.destroy();
			});
		}
	});

	describe("constructor", () => {

		let getOptionsStub;
		let getOptionsReturnStub;
		let checkOptionsStub;
		let renderStub;
		let constructElementStub;
		let showStub;
		let closeStub;
		let targetStub;
		const stubEl = document.createElement('div');

		beforeEach(() => {
			getOptionsReturnStub = {};
			getOptionsStub = sandbox.stub(Tooltip, 'getOptions').returns(getOptionsReturnStub);
			checkOptionsStub = sandbox.stub(Tooltip, 'checkOptions').returnsArg(0);
			renderStub = sandbox.stub(Tooltip.prototype, 'render');
			constructElementStub = sandbox.stub(Tooltip, 'constructElement').returns(document.createElement('div'));
			showStub = sandbox.stub(Tooltip.prototype, 'show');
			closeStub = sandbox.stub(Tooltip.prototype, 'close');
			targetStub = sandbox.stub(Tooltip, "Target");
		});

		afterEach(() => {
			getOptionsStub.restore();
			checkOptionsStub.restore();
			renderStub.restore();
			constructElementStub.restore();
			showStub.restore();
			closeStub.restore();
			targetStub.restore();
		});

		it("calls constructElement if content string passed in", () => {
			const stubOpts = {content: 'Click this button'};
			new Tooltip(stubEl, stubOpts);

			proclaim.isTrue(constructElementStub.called);
		});

		it("doesn't call constructElement if no content string is passed in", () => {
			const stubOpts = {};
			new Tooltip(stubEl, stubOpts);

			proclaim.isFalse(constructElementStub.called);
		});

		it("doesn't call getOptions if options are passed in", () => {
			const stubOpts = {};
			new Tooltip(stubEl, stubOpts);

			proclaim.isFalse(getOptionsStub.called);
		});

		it("calls getOptions if no options were passed in", () => {
			new Tooltip(stubEl);

			proclaim.isTrue(getOptionsStub.calledWith(stubEl));
		});

		it("calls checkOptions with the options passed in if some options were passed in", () => {
			const stubOpts = {};

			new Tooltip(stubEl, stubOpts);

			proclaim.isTrue(checkOptionsStub.calledWith(stubOpts));
		});

		it("calls checkOptions with the return values of getOptions if no options were passed in", () => {
			new Tooltip(stubEl);

			proclaim.isTrue(checkOptionsStub.calledWith(getOptionsReturnStub));
		});

		it("calls render if opts.showOnConstruction is set to true", () => {
			new Tooltip(stubEl, {"showOnConstruction": true});
			proclaim.isTrue(renderStub.called);
		});

		it("Adds the tooltip to the global tooltip map", () => {
			proclaim.isUndefined(Tooltip._tooltips);

			new Tooltip("stubEL");
			proclaim.strictEqual(Tooltip._tooltips.size, 1);
		});

		describe('adding target event listeners', () => {
			beforeEach(fixtures.declarativeCode);
			afterEach(fixtures.reset);

			it('adds event listeners when opts.showOnClick is set to true', () => {
				getOptionsStub.restore(); // !! IMPORTANT !!
				targetStub.restore();
				new Tooltip(document.getElementById('tooltip-demo-3'));

				document.getElementById('demo-tooltip-target-3').click();

				proclaim.isTrue(showStub.called);
			});

			it('adds event listeners when opts.showOnHover is set to true', () => {
				getOptionsStub.restore(); // !! IMPORTANT !!
				targetStub.restore();
				new Tooltip(document.getElementById('tooltip-demo-4'));

				document.getElementById('demo-tooltip-target-4').dispatchEvent(new Event('mouseover'));
				document.getElementById('demo-tooltip-target-4').dispatchEvent(new Event('mouseout'));

				proclaim.isTrue(showStub.called);
				proclaim.isTrue(closeStub.called);
			});
		});
	});

	describe("getOptions", () => {
		it("doesn't extract arrowPosition if none is set", () => {
			const el = document.createElement('div');
			const options = Tooltip.getOptions(el);

			proclaim.isUndefined(options.arrowPosition);
		});

		it("doesn't extract zIndex if it's not set", () => {
			const el = document.createElement('div');
			const options = Tooltip.getOptions(el);

			proclaim.isUndefined(options.zIndex);
		});

		it("doesn't extract target if none is set", () => {
			const el = document.createElement('div');
			const options = Tooltip.getOptions(el);

			proclaim.isUndefined(options.target);
		});

		it("extracts target if it's set on the el passed in", () => {
			const el = document.createElement('div');
			let stubTarget = '#someValue';

			el.setAttribute('data-o-tooltip-target', stubTarget);

			const options = Tooltip.getOptions(el);
			proclaim.equal(options.target, stubTarget);
		});

		it("extracts arrowPosition if it's set on the el passed in", () => {
			const el = document.createElement('div');
			let stubPosition = 'someValue';
			el.setAttribute('data-o-tooltip-position', stubPosition);

			const options = Tooltip.getOptions(el);
			proclaim.equal(options.position, stubPosition);
		});

		it("extracts showOnConstruction if it's set on the el passed in", () => {
			const el = document.createElement('div');
			el.setAttribute('data-o-tooltip-show-on-construction', true);

			const options = Tooltip.getOptions(el);
			proclaim.isTrue(options.showOnConstruction);
		});
		it("extracts showOnConstruction if it's set on the el passed in", () => {
			const el = document.createElement('div');
			el.setAttribute('data-o-tooltip-z-index', "20");

			const options = Tooltip.getOptions(el);
			proclaim.strictEqual(options.zIndex, 20);
		});
	});

	describe("checkOptions", () => {

		let throwStub;

		beforeEach(() => {
			throwStub = sandbox.stub(Tooltip, 'throwError');
		});

		afterEach(() => {
			throwStub.restore();
		});

		it("calls throwError if no target is provided", () => {
			Tooltip.checkOptions({});
			proclaim.isTrue(throwStub.called);
		});

		it("calls throwError if position is not one of `above`, `below`, `left`, `right` or falsey", () => {
			Tooltip.checkOptions({"target": "#el", "position": "side"});
			proclaim.isTrue(throwStub.called);
		});

		it("sets opts.position to below if no position was specified", ()=>{
			let opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isFalse(throwStub.called);
			proclaim.strictEqual(opts.position, 'below');
		});

		it("does not error if position is `top`, `bottom`, `left`, `right` or falsey", () => {
			["above", "left", "right", "below", undefined].forEach((value) => {
				Tooltip.checkOptions({"target": "#el", "position": value});
				proclaim.isFalse(throwStub.called);
			});
		});

		it("returns the opts object", () => {
			let opts = Tooltip.checkOptions({"target": "#el"});
			proclaim.isObject(opts);
		});
	});

	describe('constructElement', () => {
		it("returns a tooltip element", () => {
			let targetEl = document.createElement('div');
			const tooltip = Tooltip.constructElement(targetEl, {content: '<p>my content</p>'});
			proclaim.strictEqual(tooltip.nodeName, 'DIV');
			proclaim.strictEqual(tooltip.getAttribute('data-o-component'), 'o-tooltip');
			proclaim.strictEqual(tooltip.firstElementChild.nodeName, 'DIV');
			proclaim.strictEqual(tooltip.firstElementChild.className, 'o-tooltip-content');
			proclaim.strictEqual(tooltip.firstElementChild.innerHTML, '<p>my content</p>');
		});
	});

	describe.only('drawTooltip', () => {
		it(' sets tooltip position as requested when in bounds', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			evaulateTooltipStub.withArgs('below').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: false
			});
			const testTooltip = Tooltip.init('#tooltip-demo-below');

			testTooltip.show();
			proclaim.equal(testTooltip.tooltipPosition, 'below');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});

		it(' when the requested position is out of bounds sets tooltip to the next clockwise position', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			evaulateTooltipStub.withArgs('below').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: true // requested position out of bound
			});
			evaulateTooltipStub.withArgs('left').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: false
			});
			const testTooltip = Tooltip.init('#tooltip-demo-below');

			testTooltip.show();
			proclaim.equal(testTooltip.tooltipPosition, 'left');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});

		it(' when many tooltip positions are out of bounds evaluates all possible positions', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			const outOfBoundsExample = {
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: true
			};
			evaulateTooltipStub.withArgs('below').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('left').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('above').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('right').returns({
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: false
			});
			const testTooltip = Tooltip.init('#tooltip-demo-below');
			testTooltip.show();
			sinon.assert.callCount(evaulateTooltipStub, 4)
			proclaim.equal(testTooltip.tooltipPosition, 'right');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});
		it(' when all tooltip positions are out of bounds default to the requested position aligned middle', () => {
			fixtures.declarativeCode();
			const evaulateTooltipStub = sandbox.stub(Tooltip.prototype, '_evaulateTooltip');
			const outOfBoundsExample = {
				tooltipRect: {},
				alignment: 'middle',
				isOutOfBounds: true
			};
			evaulateTooltipStub.withArgs('below').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('left').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('above').returns(outOfBoundsExample);
			evaulateTooltipStub.withArgs('right').returns(outOfBoundsExample);

			const testTooltip = Tooltip.init('#tooltip-demo-below');
			testTooltip.show();

			proclaim.equal(testTooltip.tooltipPosition, 'below');
			proclaim.equal(testTooltip.tooltipAlignment, 'middle');
		});
		afterEach(() => {
			fixtures.reset();
		});
	});

	describe("#destroy", () => {
		let closeStub;
		let drawTooltipStub;

		beforeEach(() => {
			drawTooltipStub = sandbox.stub(Tooltip.prototype, 'drawTooltip');
			fixtures.declarativeCode();
			closeStub = sandbox.stub(Tooltip.prototype, 'close');
		});

		afterEach(() => {
			drawTooltipStub.restore();
			fixtures.reset();
			closeStub.restore();
		});
		it("stops listening to resize events if this is the last tooltip", () => {
			const stopListeningSpy = sinon.spy(Viewport, "stopListeningTo");
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.show();
			testTooltip.destroy();
			proclaim.isTrue(stopListeningSpy.called);
		});
		it("calls close if tooltip.visible is true", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.visible = true;
			testTooltip.destroy();
			proclaim.isTrue(closeStub.called);
		});
		it("deletes the tooltip from the tooltip map", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			Tooltip.init('#tooltip-demo-2'); // Init a second tooltip so when the first is destroyed the Tooltip._tooltips is not also destroyed

			const tooltipCount = Tooltip._tooltips.size;
			testTooltip.destroy();
			proclaim.strictEqual(tooltipCount -1, Tooltip._tooltips.size);
		});
		it("destroys the tooltip map if this is the last tooltip", () => {
			const testTooltip = Tooltip.init('#tooltip-demo');
			testTooltip.destroy();
			proclaim.isUndefined(Tooltip._tooltips);
		});
	});
});
