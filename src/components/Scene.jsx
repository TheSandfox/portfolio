import {  useFrame, useThree } from '@react-three/fiber';
import React, { useCallback, useEffect,  useRef, useState } from 'react';
import { Suspense } from 'react';
import './scene.css';
import * as THREE from 'three';
import Statue from './Statue';
import keyframes from '../utils/keyframes';
import { Html, OrbitControls } from '@react-three/drei';
import config from '../utils/config';

export default function Scene({progress}) {
	//레퍼런스
	const groupRef = useRef(null);
	const orbitRef = useRef(null);
	const lightRef = useRef(null);

	//카메라
	const { camera } = useThree();
	const [cameraInfo,setCameraInfo] = useState({
		position:{
			x:camera.position.x,
			y:camera.position.y,
			z:camera.position.z
		},
		rotation:{
			x:camera.rotation.x,
			y:camera.rotation.y,
			z:camera.rotation.z
		}
	})

	//그룹배치
	const [transform,setTransform] = useState({
		position:{x:0,y:0,z:0},
		rotation:{x:0,y:0,z:0},
		scale:{x:1.0,y:1.0,z:1.0},
	})
	const carculateTransform = useCallback((smooth)=>{
		let object = groupRef.current;
		if (smooth<=0.) {
			//즉시
			object.position.set(
				transform.position.x,
				transform.position.y,
				transform.position.z
			);
			object.rotation.set(
				transform.rotation.x,
				transform.rotation.y,
				transform.rotation.z
			);
			object.rotation.set(
				transform.rotation.x,
				transform.rotation.y,
				transform.rotation.z
			);
		} else {
			//스무스
			object.position.set(
				THREE.MathUtils.lerp(object.position.x,transform.position.x,smooth),
				THREE.MathUtils.lerp(object.position.y,transform.position.y,smooth),
				THREE.MathUtils.lerp(object.position.z,transform.position.z,smooth),
			)
			//스무스
			object.rotation.set(
				THREE.MathUtils.lerp(object.rotation.x,transform.rotation.x,smooth),
				THREE.MathUtils.lerp(object.rotation.y,transform.rotation.y,smooth),
				THREE.MathUtils.lerp(object.rotation.z,transform.rotation.z,smooth),
			)
			//스무스
			object.scale.lerp(
				transform.scale,smooth
			)
		}
	},[transform]);
	// 광원, 카메라 초기화
	useEffect(()=>{
		if (lightRef.current) {
			lightRef.current.target.position.set(0,0,0);
		}
		if(!config.debug) {
			camera.position.set(
				keyframes.cameraPosition.getPoint(progress).x,
				keyframes.cameraPosition.getPoint(progress).y,
				keyframes.cameraPosition.getPoint(progress).z,
			)
			camera.rotation.set(
				keyframes.cameraRotation.getPoint(progress).x,
				keyframes.cameraRotation.getPoint(progress).y,
				keyframes.cameraRotation.getPoint(progress).z,
			)
		}
		carculateTransform(0.);
	},[carculateTransform]);
	// 리사이징에 따른 위치조정
	useFrame(()=>{
		carculateTransform(0.1);
		if(!config.debug) {
			camera.position.lerp(
				keyframes.cameraPosition.getPoint(progress),0.1
			)
			camera.rotation.set(
				THREE.MathUtils.lerp(camera.rotation.x,keyframes.cameraRotation.getPoint(progress).x,0.1),
				THREE.MathUtils.lerp(camera.rotation.y,keyframes.cameraRotation.getPoint(progress).y,0.1),
				THREE.MathUtils.lerp(camera.rotation.z,keyframes.cameraRotation.getPoint(progress).z,0.1),
			)
		}
		setCameraInfo({
			position:{
				x:camera.position.x,
				y:camera.position.y,
				z:camera.position.z
			},
			rotation:{
				x:camera.rotation.x,
				y:camera.rotation.y,
				z:camera.rotation.z
			}
		})
	})
	return <>
		<group ref={groupRef}>
			<ambientLight intensity={1.75}/>
			{config.debug?<OrbitControls ref={orbitRef}/>:<></>}
			{/* 선라이트 */}
			<directionalLight ref={lightRef}
				position={[0,73,0]}
				// position={[-73 * 1.0, 73 * 1.0, 73 * 1.0]}
				intensity={1.0}
				castShadow={true}
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
			>
				<orthographicCamera attach="shadow-camera" args={[-128*(0.25), 128*(0.25), -128*(0.25), 128*(0.25), 0.1, 400]} />
			</directionalLight>
			<Suspense fallback={null}>
				<Statue progress={progress}/>
			</Suspense>
			{/* 그림자 */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
				<planeGeometry args={[100, 100]} />
				<shadowMaterial transparent opacity={0.4} />
			</mesh>
		</group>
		<Html>
			<div style={{backgroundColor:'#fff'}}>
				{cameraInfo.position.x}<br/>
				{cameraInfo.position.y}<br/>
				{cameraInfo.position.z}<br/>
				{cameraInfo.rotation.x}<br/>
				{cameraInfo.rotation.y}<br/>
				{cameraInfo.rotation.z}<br/>

			</div>
		</Html>
	</>
}