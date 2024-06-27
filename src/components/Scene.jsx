import { useAnimations, useGLTF, useCursor, useTexture, OrbitControls, Html } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { Suspense } from 'react';
import { useControls } from 'leva';
import './scene.css';
import * as THREE from 'three';

function Statue() {
	//html 좌표
	const [htmlPosition,setHtmlPosition] = useState({
		position3D:null,
		position2D:[0,0]
	})
	const handleHtmlPosition = {
		set3D:(x,y,z)=>{
			setHtmlPosition({
				position3D:[x,y,z],
				position2D:[...htmlPosition.position2D]
			})
		},
		set2D:(left,top)=>{
			setHtmlPosition({
				position3D:[...htmlPosition.position3D],
				position2D:[left,top]
			})
		}
	}

	//useThree
	const { camera } = useThree();

	//레퍼런스
	const buttonRef = useRef(null);

	// 모델&텍스쳐 불러오기
	const statue = useGLTF("/portfolio/sandfox.gltf");
	const texture = useTexture("/portfolio/sandfox.webp")

	// '스켈레톤' 복제
	const scene = useMemo(() => SkeletonUtils.clone(statue.scene), [statue.scene]);

	// '스켈레톤'에서 트래킹노드 복제
	const { nodes } = useGraph(scene);

	// 애니메이션 데이터 복제
	const { ref, actions, names } = useAnimations(statue.animations);

	// 마우스오버 응답& 애니메이션 인덱스
	const [hovered, setHovered] = useState(false);
	const [index, setIndex] = useState(1/* Math.floor(Math.random()*2) */);
	const [cameraAnimIndex, setCameraAnimIndex] = useState(0);

	// 유즈 커서(정확히 용도 모름)
	useCursor(hovered);

	// 클릭 시 변경되는 인덱스에 따른 애니메이션 분기
	useEffect(() => {
		console.log(actions);
		// 인덱스에 따른 분기
		switch(index) {
		case 0:
			//앉기
			actions['sandfox_sitting'].reset().play();
			actions['button_default'].reset().fadeIn(0.25).play();
			break;
		case 1:
			//샷건치기
			actions['sandfox_smashLoop'].reset().play();
			actions['button_pressed'].reset().fadeIn(0.25).play();
			break;
			default :
		}

		// 인덱스 바뀌기 전 클린업
		return () => {
			switch(index) {
			case 0:
				//앉기
				actions['sandfox_sitting'].fadeOut(0.25).stop();
				actions['button_default'].fadeOut(0.25).stop();
				break;
			case 1:
				//샷건치기
				actions['sandfox_smashLoop'].fadeOut(0.25).stop();
				actions['button_pressed'].fadeOut(0.25).stop();
			break;
			default :
			}
		}
	}, [index, actions, names]);

	//애니메이션 프로퍼티
	useEffect(()=>{
		actions['button_position'].reset().play();
	},[actions])

	// 디버그용
	useEffect(()=>{
		// console.log(scene);
		console.log(nodes);
		console.log(actions);
		// console.log(ref.current);
	},[nodes])

	//카메라 리프레시
	useEffect(()=>{
		camera.position.copy(nodes.camera.position);
        camera.rotation.copy(nodes.camera.rotation);
        camera.fov = nodes.camera.fov;
        camera.near = nodes.camera.near;
        camera.far = nodes.camera.far;
        camera.updateProjectionMatrix();
	},[camera,nodes]);

	//카메라 애니메이션
	const originCameraVector = useMemo(()=>{
		return new THREE.Vector3(
			nodes.camera.position.x,
			nodes.camera.position.y,
			nodes.camera.position.z
		);
	},[camera])
	const targetCameraVector = useMemo(()=>{
		return new THREE.Vector3(
			nodes.camera.position.x+1.0,
			nodes.camera.position.y,
			nodes.camera.position.z-1.0
		);
	},[camera])
	useFrame(() => {
		camera.position.lerp(hovered?originCameraVector:targetCameraVector, 0.1);
		// camera.lookAt(ref.current.position.x,ref.current.position.y,ref.current.position.z);
		// camera.updateProjectionMatrix();
	})

	// return jsx
	return <> 
		<group ref={ref} dispose={null} castShadow={true}>
			<group
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			onClick={() => setIndex((index + 1) % 2)}
			scale={[0.01, 0.01, 0.01]}>
				{/* 몸통 */}
				<skinnedMesh
					// castShadow
					// receiveShadow
					geometry={nodes.sandfox_mesh.geometry}
					skeleton={nodes.sandfox_mesh.skeleton}
				>
					<meshStandardMaterial map={texture} map-flipY={false} skinning />
				</skinnedMesh>
			</group>
			<group ref={buttonRef}>
				{/* 버튼 */}
				<skinnedMesh
					// castShadow
					// receiveShadow
					geometry={nodes.button_mesh.geometry}
					skeleton={nodes.button_mesh.skeleton}
				>
					<meshStandardMaterial map={texture} map-flipY={false} skinning />
				</skinnedMesh>
			</group>
			<group>
				{/* 의자 */}
				<skinnedMesh
					// castShadow
					// receiveShadow
					skeleton={nodes.chair_mesh.skeleton}
					geometry={nodes.chair_mesh.geometry}
				>
					<meshStandardMaterial map={texture} map-flipY={false} skinning />
				</skinnedMesh>
			</group>
			<primitive object={nodes.camera}/>
			<primitive object={nodes.bone_root} />
			<primitive object={nodes.bone_chair_root} />
			<primitive object={nodes.bone_button_root} />
		</group>
		{/* {
			htmlPosition.position3D
			?<Html position={htmlPosition.position3D}>
				<div style={{userSelect:'none'}}>div</div>
			</Html>
			:<></>
		} */}
	</>
}

export default function Scene() {
	const groupRef = useRef(null);
	const orbitRef = useRef(null);
	const lightRef = useRef(null);
	//레퍼런스 초기화
	useEffect(()=>{
		if (lightRef.current) {
			lightRef.current.target.position.set(0,0,0);
		}
	},[])
	return <>
		<group ref={groupRef}>
			<ambientLight intensity={1.5}/>
			{/* <OrbitControls ref={orbitRef}/> */}
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
				<Statue/>
			</Suspense>
			{/* 그림자 */}
			{/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
				<planeGeometry args={[100, 100]} />
				<shadowMaterial transparent opacity={0.4} />
			</mesh> */}
		</group>
	</>
}