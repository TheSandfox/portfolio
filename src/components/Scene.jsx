import { useAnimations, useGLTF, useCursor, useTexture, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { Suspense } from 'react';
import './scene.css';
import * as THREE from 'three';

function Statue({statueState}) {
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
	const [index, setIndex] = useState(Math.floor(Math.random()*2));
	console.log(index);

	// 유즈 커서(정확히 용도 모름)
	useCursor(hovered)

	// 애니메이션 인덱스 변경 시 애니메이션 컨트롤
	useEffect(() => {
		// 인덱스에 따른 분기
		switch(index) {
		case 0:
			//앉기
			actions['sandfox_sitting'].reset().play();
			actions['button_default'].reset().play();
			break;
		case 1:
			//샷건치기
			actions['sandfox_smashLoop'].reset().play();
			actions['button_pressed'].reset().play();
			break;
			default :
		}
		// 인덱스 바뀌기 전 클린업
		return () => {
			switch(index) {
			case 0:
				//앉기
				actions['sandfox_sitting'].stop();
				actions['button_default'].stop();
				break;
			case 1:
				//샷건치기
				actions['sandfox_smashLoop'].stop();
				actions['button_pressed'].stop();
			break;
			default :
			}
		}
	}, [index, actions, names]);

	// 디버그용
	useEffect(()=>{
		// console.log(scene);
		// console.log(nodes);
		console.log(actions);
		// console.log(ref.current);
	},[nodes])

	// 그룹 상태 초기화
	useEffect(()=>{
		ref.current.position.set(
			statueState.x,
			statueState.y,
			statueState.z
		);
		ref.current.rotation.y = THREE.MathUtils.degToRad(-90);
	},[statueState])

	// track 정보가 기록된 스켈레톤이 애니메이션에 의해 움직이면 >
	// bone들이 움직이고 bone들이 움직이면 >
	// skinnedMesh가 움직이는 형태
	return <group ref={ref} dispose={null} castShadow={true}>
		<group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setIndex((index + 1) % 2)}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.01, 0.01, 0.01]}>
			{/* 몸통 */}
			<skinnedMesh
				castShadow
				receiveShadow
				geometry={nodes.sandfox_mesh.geometry}
				skeleton={nodes.sandfox_mesh.skeleton}
			>
				<meshStandardMaterial map={texture} map-flipY={false} skinning />
			</skinnedMesh>
		</group>
		<group ref={buttonRef}>
			{/* 버튼 */}
			<skinnedMesh
				castShadow
				receiveShadow
				geometry={nodes.button_mesh.geometry}
				skeleton={nodes.button_mesh.skeleton}
			>
				<meshStandardMaterial map={texture} map-flipY={false} skinning />
			</skinnedMesh>
		</group>
		<group>
			{/* 의자 */}
			<skinnedMesh
				castShadow
				receiveShadow
				skeleton={nodes.chair_mesh.skeleton}
				geometry={nodes.chair_mesh.geometry}
			>
				<meshStandardMaterial map={texture} map-flipY={false} skinning />
			</skinnedMesh>
		</group>
		<primitive object={nodes.bone_root} />
		<primitive object={nodes.bone_chair_root} />
		<primitive object={nodes.bone_button_root} />
	</group>
}

export default function Scene() {
	const orbitRef = useRef(null);
	const lightRef = useRef(null);
	//조각상 배열 관련
	const [counts,setCounts] = useState(16);
	const [perRow,setPerRows] = useState(4);
	const [gap,setGap] = useState(7.5);
	const approxWidth = useMemo(()=>{
		return ((counts<perRow)?(counts-1):(perRow-1)) * gap;
	},[counts,perRow,gap]);
	const approxHeight = useMemo(()=>{
		return (Math.ceil(counts/perRow)-1) * gap;
	},[counts,perRow,gap]);
	const statueStates = useMemo(()=>{
		let newStatueStates = [];
		for(let i = 0;i<counts;i++) {
			let newStatueState = {
				x: ((i%perRow)*gap) - (approxWidth/2),
				y: 0,
				z: Math.floor(i/perRow)*gap - (approxHeight/2),
			}
			newStatueStates.push(newStatueState);
		}
		return newStatueStates;
	},[counts,perRow,gap,approxWidth,approxHeight]);
	//
	useEffect(()=>{
		if (lightRef.current) {
			lightRef.current.target.position.set(0,0,0);
		}
	},[])
	//
	useFrame(()=>{
		orbitRef.current.update();
	})
	return <>
		<ambientLight intensity={1.5}/>
		<OrbitControls ref={orbitRef}/>
		<directionalLight ref={lightRef}
			position={[73 * 1.0, 60 * 1.0, 73 * 1.0]}
			intensity={1.0}
			castShadow={true}
			shadow-mapSize-width={1024}
			shadow-mapSize-height={1024}
		>
			<orthographicCamera attach="shadow-camera" args={[-128*(0.25), 128*(0.25), -128*(0.25), 128*(0.25), 0.1, 400]} />
		</directionalLight>
		<Suspense fallback={null}>
			{
				statueStates.map((statueState,index)=>{
					return <Statue key={index} index={index} statueState={statueState}/>
				})
			}
		</Suspense>
		{/* 그림자 */}
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
			<planeGeometry args={[100, 100]} />
			<shadowMaterial transparent opacity={0.4} />
		</mesh>
	</>
}