class Target {
	constructor(targetEl) {
		this.targetEl = targetEl;

		// @deprecated This is not used anywhere in the codebase, seems like we don't need it
        this.rectObject = targetEl.getBoundingClientRect();
    }

    // @deprecated This is not used anywhere in the codebase, seems like we don't need it
    getEdge(edge){
        console.warn('The `getEdge` method is depracated and will be removed in the next major version of o-tooltip');
        const edges = {"top": this.top, "bottom": this.bottom, "right": this.right, "left": this.left};
        return edges[edge];
    }
    // @deprecated ^^^

	// @deprecated This is not used anywhere in the codebase, seems like we don't need it
	get offsetTop() {
		console.warn('The `offsetTop` property is deprecated and will be removed in the next major version of o-tooltip');
		return this.targetEl.offsetTop;
	}
	// @deprecated ^^^

	get left() {
		return this.targetEl.getBoundingClientRect().left;
	}

	get right() {
		return this.left + this.width;
	}

	get top() {
		return this.targetEl.getBoundingClientRect().top + (document.body.scrollTop || document.documentElement.scrollTop);
	}

	get bottom() {
		return this.top + this.height;
	}

	get width() {
		return this.targetEl.getBoundingClientRect().width;
	}

	get height() {
		return this.targetEl.getBoundingClientRect().height;
	}

	get centrePoint(){
		return { x: this.left + (this.width/2), y: this.top + (this.height/2)};
	}
}

export default Target;
