class ConstantCurve {
	values = []
	getPoint(t) {
		if (this.values.length>0) {
			t = Math.max(Math.min(t,1.0),0.);
			if (t>=1.0) {
				return this.values[this.values.length-1];
			} else {
				return this.values[Math.floor(t*this.values.length)];
			}
		} else {
			return 0.
		}
	}
	constructor(values) {
		this.values = values;
	}
}

export {
	ConstantCurve
}