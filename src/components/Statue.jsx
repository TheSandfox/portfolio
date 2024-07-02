import { useAnimations, useGLTF, useTexture, OrbitControls, Html, useCursor } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import './scene.css';
import * as THREE from 'three';
import Keyframes from '../utils/keyframes';
import { Bloom } from '@react-three/postprocessing'

export default function Statue({progress, sectionIndex, gotoActive}) {
	//커서 오버레이
	const [hover,setHover] = useState(false);
	useCursor(hover);

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
	const emissiveMap = useTexture("/portfolio/sandfox_emissive.png")

	// '스켈레톤' 복제
	const scene = useMemo(() => SkeletonUtils.clone(statue.scene), [statue.scene]);

	// '스켈레톤'에서 트래킹노드 복제
	const { nodes } = useGraph(scene);

	// 애니메이션 데이터 복제
	const { ref, actions, names } = useAnimations(statue.animations);

	// 애니메이션 인덱스
	const [index, setIndex] = useState(1/* Math.floor(Math.random()*2) */);


	// 클릭 시 변경되는 인덱스에 따른 애니메이션 분기
	useEffect(() => {
		// console.log(actions);
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
			actions['button_pressed'].reset().fadeIn(0.25).play();
			break;
		case 2:
			//인사하기
			actions['sandfox_sayHi'].reset().play();
			break;
		default :
		}

		// 인덱스 바뀌기 전 클린업
		return () => {
			switch(index) {
			case 0:
				//앉기
				actions['sandfox_sitting'].fadeOut(0.25).stop();
				actions['button_default'].stop();
				break;
			case 1:
				//샷건치기
				actions['sandfox_smashLoop'].fadeOut(0.25).stop();
				actions['button_pressed'].stop();
				break;
			case 2:
				//인사하기
				actions['sandfox_sayHi'].fadeOut(0.25).stop();
				break;
			default :
			}
		}
	}, [index, actions, names]);

	//애니메이션 프로퍼티
	useEffect(()=>{
		actions['button_position'].reset().play();
	},[actions])

	//키프레임, 섹션인덱스에 따른 조정
	useEffect(()=>{
		setIndex(Keyframes.animationIndex[sectionIndex].getPoint(progress));
	},[progress,sectionIndex])

	// 디버그용
	useEffect(()=>{
		// console.log(scene);
		// console.log(nodes);
		// console.log(actions);
		// console.log(statue);
		// console.log(ref.current);
	},[nodes])

	useFrame(() => {
		// let object = buttonRef.current
		// object.scale.set(
		// 	THREE.MathUtils.lerp(object.scale.x,Keyframes.buttonScale[sectionIndex].getPoint(progress),0.1),
		// 	THREE.MathUtils.lerp(object.scale.y,Keyframes.buttonScale[sectionIndex].getPoint(progress),0.1),
		// 	THREE.MathUtils.lerp(object.scale.z,Keyframes.buttonScale[sectionIndex].getPoint(progress),0.1)
		// )
		// console.log(Keyframes.buttonScale[sectionIndex].getPoint(progress)+', '+object.scale.x);
	})

	// return jsx
	return <> 
		<group ref={ref} dispose={null} castShadow={true}>
			<group>
				{/* 몸통 */}
				<skinnedMesh
					castShadow
					// receiveShadow
					geometry={nodes.sandfox_mesh.geometry}
					skeleton={nodes.sandfox_mesh.skeleton}
				>
					<meshStandardMaterial map={texture} map-flipY={false}/*  skinning  *//>
				</skinnedMesh>
			</group>
			<group 
				ref={buttonRef} 
				visible={sectionIndex!==1}
				// onPointerEnter={()=>{setHover(true&&(sectionIndex===0))}}
				// onPointerLeave={()=>{setHover(false)}}
				// onClick={()=>{if(hover){gotoActive();}}}
			>
				{/* 버튼 */}
				<skinnedMesh
					castShadow
					// receiveShadow
					geometry={nodes.button_mesh.geometry}
					skeleton={nodes.button_mesh.skeleton}	
				>
					<meshStandardMaterial 
						map={texture} 
						map-flipY={false} 
						emissiveMap={emissiveMap}
						emissiveIntensity={Keyframes.buttonEmissiveIntensity[sectionIndex].getPoint(progress)}
						emissive={new THREE.Color(0xffff00)} 
						skinning 
					/>
				</skinnedMesh>
			</group>
			<group visible={sectionIndex!==1}>
				{/* 의자 */}
				<skinnedMesh
					castShadow
					// receiveShadow
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
		
		{/* {
			htmlPosition.position3D
			?<Html position={htmlPosition.position3D}>
				<div style={{userSelect:'none'}}>div</div>
			</Html>
			:<></>
		} */}
	</>
}