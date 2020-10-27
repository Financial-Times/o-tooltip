export default Tooltip;
declare class Tooltip {
    static _getCurrentLayout(): any;
    /**
     * Get the data attributes from the tooltipEl. If the tooltip is being set up
     * declaratively, this method is used to extract the data attributes from
     * the DOM.
     * @param {HTMLElement} tooltipEl - The tooltip element in the DOM (Required)
    */
    static getOptions(tooltipEl: HTMLElement): {};
    /**
     * Check the options passed in are valid, and that the required option
     * (target) is present
     * @param {Object} opts - An Object with configuration options for the tooltip
     * @throws o-tooltip error: opts.target is not set
     * @throws o-tooltip error: opts.tooltipPosition is not one of "above", "below"
     * "left" or "right"
    */
    static checkOptions(opts: any): any;
    static constructElement(targetEl: any, opts: any): HTMLDivElement;
    static _pointIsOutOfBounds(point: any, axis: any, opts: any): boolean;
    static _rotateOrientation(orientation: any): any;
    static throwError(message: any): void;
    static init(rootEl: any, opts: any): any;
    /**
     * Represents a tooltip.
     * @constructor
     * @param {HTMLElement} tooltipEl - The tooltip element in the DOM (Required)
     * @param {Object} opts - An options object for configuring the tooltip (Optional)
    */
    constructor(tooltipEl: HTMLElement, opts: any);
    opts: any;
    tooltipEl: HTMLElement;
    targetNode: HTMLElement;
    target: Target;
    tooltipPosition: any;
    tooltipAlignment: string;
    visible: boolean;
    delegates: {
        target: any;
        doc: any;
        tooltip: any;
    };
    /**
     * Render the tooltip. Adds markup and attributes to this.tooltipEl in the DOM
    */
    render(): void;
    /**
     * Show the tooltip. Adds event handlers for clicks, touches, keypresses and
     * viewport resizes. Uses FTDomDelegate to implement the event delegate
     * pattern. Calls DrawTooltip.
    */
    show(): void;
    closeHandler: any;
    closeOnKeyUpHandler: any;
    resizeListenerHandler: any;
    /**
     * Toggle the tooltip open and close
     */
    toggle(): void;
    /**
     * Close the tooltip after set time
     * @param seconds
     */
    closeAfter(seconds: any): void;
    closeTimeout: number;
    /**
     * Show the tooltip after set time
     * @param seconds
     */
    showAfter(seconds: any): void;
    showTimeout: number;
    /**
     * Destroy the tooltip.
    */
    destroy(): void;
    /**
     * Close the tooltip. (Visually hide it and remove event listeners)
    */
    close(event: any, target: any, fireCloseEvent?: boolean): boolean;
    /**
     * @param {Event} ev - calls close on the tooltip if the key is Esc
    */
    closeOnKeyUp(ev: Event): void;
    /**
     * Respond to resize events. Redraw the tooltip in case the target has moved.
     * @todo: There are many optimisations to make here- we're redrawing even if
     * the target hasn't moved.
    */
    resizeListener(): void;
    /**
     * Calculates the best place to position the tooltip based on space around the
     * target and a preference set by the user.
     * @throws {Error} if Tooltip can't be drawn in the client window
    */
    drawTooltip(): any;
    tooltipRect: {};
    /**
     * @returns: the offset width of the tooltip element
    */
    width(): number;
    /**
     * @returns {Integer}: the offset height of the tooltip element
    */
    height(): any;
    /**
     * @returns {Boolean} If the set position is out of bounds.
    */
    _evaulateTooltip(position: any): boolean;
    /**
     * @returns {Object} sets this.tooltipRect to `left`, `right`, `top` and `bottom`
     * representing the bounding box of the tooltip (including the arrow)
    */
    _calculateTooltipRectangle(position: any, alignment: any): any;
    calculateTooltipRect(position: any): any;
    _getConfiguredTooltipPosition(): any;
    _setArrow(): void;
    /**
     * Checkes is a hypothetical tooltip is in bounds on all sides.
     * @param {Object} tooltipRect - An object which represents a hypothetical tooltip position.
    */
    _tooltipIsOutOfBounds(tooltipRect: any): boolean;
}
declare namespace Tooltip {
    export const idSuffix: string;
    export const arrowDepth: number;
    export namespace positionToArrowPositionMap {
        const above: string;
        const below: string;
        const left: string;
        const right: string;
    }
    export namespace alignmentToArrowAlignmentMap {
        export const top: string;
        export const bottom: string;
        const right_1: string;
        export { right_1 as right };
        const left_1: string;
        export { left_1 as left };
        export const middle: string;
    }
    export const validArrowAlignments: string[];
    export const validTooltipPositions: string[];
    export { Target };
}
import Target from "./target.js";
