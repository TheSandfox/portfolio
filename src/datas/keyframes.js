import * as THREE from 'three';
import { ConstantCurve } from './mycurve';

const Keyframes = {
	introState: [
		// 인트로
		new ConstantCurve([
			0,
			0,
			1,
		]),
		//엔딩
		new ConstantCurve([
			2,
			2
		]),
	],
	//카메라 위치
	cameraPosition: [
		//인트로
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(-18,10,19),
			// new THREE.Vector3(-26,13,24),
			new THREE.Vector3(15,9.94,19.5),
		]),
		//엔딩
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(-9.76,7.66,28.99),
			new THREE.Vector3(-9.76,7.66,28.99),
		])
	],
	//카메라 
	cameraRotation: [
		//인트로
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(-0.481,-0.871,-0.380),
			new THREE.Vector3(-0.454,0.764,0.326),
		]),
		//엔딩
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(-0.198,-0.466,-0.09),
			new THREE.Vector3(-0.198,-0.466,-0.09),
		])
	],
	//애니메이션 인덱스
	animationIndex: [
		//인트로
		new ConstantCurve([
			0,
			0,
			1,
		]),
		//엔딩
		new ConstantCurve([
			2,
			2
		]),
	],
	//버튼 크기
	buttonScale: [
		//인트로
		new ConstantCurve([
			1.0,
			1.0,
			1.0,
		]),
		//엔딩
		new ConstantCurve([
			0,
			0
		])
	],
	//버튼 이미시브
	buttonEmissiveIntensity: [
		//인트로
		new ConstantCurve([
			0.0,
			0.0,
			1.0
		]),
		//엔딩
		new ConstantCurve([
			0.0,
			0.0
		]),
	],
	//배경타일링
	backgroundColorIndex: [
		//인트로
		new ConstantCurve([
			0,
			0,
			1,
		]),
		//엔딩
		new ConstantCurve([
			2,
			2
		])
	],
	//앰비언트밝기
	ambientIntensity: [
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(1.0,0,0),
			new THREE.Vector3(1.0,0,0),
			new THREE.Vector3(2.0,0,0),
		]),
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(2.0,0,0),
			new THREE.Vector3(2.0,0,0),
		])
	],
	//태양광위치
	sunPosition: [
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(-10,73,0),
			new THREE.Vector3(-10,73,0),
			new THREE.Vector3(-10,73,73),
		]),
		new THREE.CatmullRomCurve3([
			new THREE.Vector3(0,73,73),
			new THREE.Vector3(0,73,73),
		])
	]
}

Keyframes.ambientIntensity.forEach((item)=>{
	item.curveType = 'centripetal';
})
Keyframes.sunPosition.forEach((item)=>{
	item.curveType = 'centripetal';
})

export default Keyframes;