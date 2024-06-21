import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import './scene.css';
import * as THREE from 'three';

function Statue({statueState,handleFocus,index}) {
	const [hover,setHover] = useState(null);
	const { camera } = useThree();
	const statue = useGLTF('/portfolio/statue.glb');
	const scene = useMemo(()=>{
		return statue.scene.clone();
	},[statue]);
	const collider = useMemo(()=>{
		const geometry = new THREE.BoxGeometry(2.5,5,2.5); 
		const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
		const cube = new THREE.Mesh( geometry, material );
		cube.position.set(
			statueState.x,
			statueState.y+geometry.parameters.height/2,
			statueState.z
		) 
		return cube;
	},[]);
	const animations = useAnimations(statue.animations,scene);
	//scene초기화
	useEffect(()=>{
		scene.position.set(
			statueState.x,
			statueState.y,
			statueState.z
		)
		return ()=>{
			if (scene.parent) {
				scene.parent.remove(scene);
			}
		}
	},[statue])
	//애니메이션
	useEffect(()=>{
		const action = animations.actions["floating"];
		if (hover) {
			console.log('재생');
			action.repetitions += 1;
			action.play();
		} else {
			// action.fadeOut(0.5);
		}

		return () => {
			// action.fadeOut(0.5);
		}
	},[hover])
	//
	const enterCallback = ()=>{
		setHover(true);
	}
	const leaveCallback = ()=>{
		setHover(false);
	}
	return <>
		<primitive
			receiveShadow={true}
			object={scene} 
			// rotation-y={THREE.MathUtils.degToRad(-90)}
		/>
		<primitive 
			visible={false}
			object={collider}
			onPointerEnter={enterCallback}
			onPointerLeave={leaveCallback}
		/>
	</>
}

export default function Scene() {
	const lightRef = useRef(null);
	//조각상 배열 관련
	const [counts,setCounts] = useState(1);
	const [perRow,setPerRows] = useState(8);
	const [gap,setGap] = useState(5.0);
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
	},[counts,perRow,gap,approxWidth,approxHeight,focus]);
	//
	useEffect(()=>{
		if (lightRef.current) {
			lightRef.current.target.position.set(0,0,0);
		}
	},[])
	return <div className='scene'>
		<Canvas className='canvas'
			shadows
			style={{
				height:"100dvh",
				backgroundColor: "var(--color-main)"
			}}
			camera={{fov:23,near:0.05,far:400,position:[-73,60,73]}}
		>
			<ambientLight intensity={1.5}/>
			<directionalLight ref={lightRef} position={[73,60,0]} intensity={1.0} castShadow={true}/>
			{
				statueStates.map((statueState,index)=>{
					return <Statue key={index} index={index} statueState={statueState}/>
				})
			}
		</Canvas>
	</div>
}