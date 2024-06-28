import * as THREE from 'three';

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

const keyframes = {
	//카메라 위치
	cameraPosition: new THREE.CatmullRomCurve3([
		new THREE.Vector3(-26,13,24),
		new THREE.Vector3(15,9.94,19.5),
	]),
	//카메라 
	cameraRotation: new THREE.CatmullRomCurve3([
		new THREE.Vector3(-0.493,-0.854,-0.385),
		new THREE.Vector3(-0.454,0.764,0.326),
	]),
	//애니메이션 인덱스
	animationIndex: new ConstantCurve([
		0,
		0,
		1,
	]),
	//버튼 크기
	buttonScale: new ConstantCurve([
		0.0,
		0.0,
		1.0,
	]),
	//배경타일링
	backgroundColorIndex: new ConstantCurve([
		0,
		0,
		1,
	])
	
}

export default keyframes;