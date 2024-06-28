import './App.css'
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene'
import Ex1 from './examples/Ex1';
import Ex2 from './examples/Ex2';
import { ScrollControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'

const sceneLength = 2.0;
const progressOffset = 0.0;
const progressVelocity = 2.25;

function App() {
	//레퍼런스
	const sceneRef = useRef(null);
	const canvasRef = useRef(null);
	const middleRef = useRef(null);
	const outtroRef = useRef(null);
	//씬 프로그레스
	const [sceneProgress,setSceneProgress] = useState(0.);
	const [barProgress,setBarProgress] = useState(0.);
	useEffect(()=>{
		const scrollCallback = ()=>{
			const sceneElement = sceneRef.current;
			const canvasElement = canvasRef.current;
			const approx = (sceneElement.getBoundingClientRect().top * -1) / (sceneElement.offsetHeight-canvasElement.offsetHeight);
			// console.log(approx);
			setSceneProgress(
				Math.max(Math.min(progressOffset+(approx*progressVelocity),1.0),+0.0)
			)
		}
		const barTimer = setInterval(()=>{
			setBarProgress(THREE.MathUtils.lerp(barProgress,sceneProgress,0.1));
		},5)

		window.addEventListener('scroll',scrollCallback);
		
		return ()=>{
			window.removeEventListener('scroll',scrollCallback);
			clearInterval(barTimer);
		}
	},[sceneProgress,barProgress]);
		
	return <>
		{/* <Ex2></Ex2> */}
		<div id='scene' style={{height:`${100*sceneLength}dvh`,position:'relative'}} ref={sceneRef}>
			<div id='canvasWrapper'>
				{/* 프로그레스바 */}
				<div id='sceneProgress'>
					<div id='sceneProgressBar' style={{width:`${100*barProgress}%`}}>

					</div>
				</div>
				{/* 캔버스 */}
				<Canvas id='canvas'
					ref={canvasRef}
					shadows
					shadow-mapsize-width={1024}
					shadow-mapsize-height={1024}
					//캔버스 스타일
					style={{
						height:"100dvh",
						backgroundColor: "var(--color-main)",
						// border: "1px solid #ff0000"
					}}
					camera={{fov:23,near:0.05,far:400,zoom:1.0,position:[0,55,73]}}
				>
					<Scene progress={sceneProgress}></Scene>
				</Canvas>
			</div>
			<div id='sceneGradient'></div>
		</div>
		<div id='middle' ref={middleRef}>미들</div>
		<div id='outtro' ref={outtroRef}>
			<div>
				얍얍
			</div>
		</div>
	</>
}

export default App
