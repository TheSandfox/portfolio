const zooms = [
	1.0,
	1.0,
	1.0,
	0.9,
	0.75,
	0.5,
	0.33
]

const maxWidth = [
	1535,
	1440,
	1280,
	960,
	720,
	480
]

const get = ()=>{
	let pixel = window.innerWidth;
	for(let i=0;i<maxWidth.length;i++) {
		if (pixel>maxWidth[i]) {
			return i;
		}
		// console.log('홋');
	}
	return maxWidth.length;
}

export {
	get,
	zooms
}