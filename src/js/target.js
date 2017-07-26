class Target {
	constructor(targetEl) {
		this.targetEl = targetEl;
		this.rectObject = targetEl.getBoundingClientRect();
	}

	getEdge(edge){
		const edges = {"top": this.top, "bottom": this.bottom, "right": this.right, "left": this.left};
		return edges[edge];
	}

	get left() {
		return this.targetEl.getBoundingClientRect().left;
	}

	get right() {
		return this.targetEl.getBoundingClientRect().right;
	}

	get top() {
		return this.targetEl.getBoundingClientRect().top;
	}

	get bottom() {
		return this.targetEl.getBoundingClientRect().bottom;
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
