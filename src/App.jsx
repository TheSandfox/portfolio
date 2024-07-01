import './App.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Scene from './components/Scene'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three'
import { Bloom, EffectComposer, SSAO } from '@react-three/postprocessing';
import * as BreakPoint from '/src/utils/breakpoint';
import BackgroundPanel from './components/BackgroundPanel';
import Keyframes from './utils/keyframes';

const sceneLength = 2.0;
const progressOffset = 0.0;
const progressVelocity = 2.25;
const zooms = [
	1.0,
	0.75,
	0.5,
	0.33
]

function App() {
	//레퍼런스
	const sceneRef = useRef(null);
	const canvasRef = useRef(null);
	const middleRef = useRef(null);
	const outtroRef = useRef(null);
	//섹션워프
	const gotoActive = ()=>{
		const sceneElement = sceneRef.current;
		if (sceneElement===null) {return;}
		window.scrollTo({behavior: 'smooth', top:window.innerHeight*(sceneLength/2), left:0});
	}
	//지금어디섹션
	const carculateSectionIndex = ()=>{
		if (middleRef.current===null) {return 0;}
		if (middleRef.current.getBoundingClientRect().top<=0.) {
			return 1;
		} else {
			return 0;
		}
	}
	//지금어디프로그레스
	const carculateSceneProgress = ()=>{
		const sceneElement = sceneRef.current;
		const canvasElement = canvasRef.current;
		const approx = (sceneElement.getBoundingClientRect().top * -1) / (sceneElement.offsetHeight-canvasElement.offsetHeight);
		return Math.max(Math.min(progressOffset+(approx*progressVelocity),1.0),+0.0);
	}
	//씬 프로그레스
	const [sceneProgress,setSceneProgress] = useState(0.);
	const [barProgress,setBarProgress] = useState(0.);
	const [sectionIndex,setSectionIndex] = useState(carculateSectionIndex());
	//반응형 줌
	const [zoomIndex,setZoomIndex] = useState(BreakPoint.get());
	const backgroundColorIndex = useMemo(()=>{
		return Keyframes.backgroundColorIndex[sectionIndex].getPoint(sceneProgress);
	},[sceneProgress,sectionIndex]);
	//스크롤관련 전부
	useEffect(()=>{
		const scrollCallback = ()=>{
			//씬 프로그레스
			setSceneProgress(
				carculateSceneProgress()
			)
			//섹션인덱스
			setSectionIndex(
				carculateSectionIndex()
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
		
	//리사이즈
	useEffect(()=>{
		const resizeCallback = ()=>{
			setZoomIndex(BreakPoint.get());
		}
		window.addEventListener('resize',resizeCallback);
		
		return ()=>{
			window.removeEventListener('resize',resizeCallback);
		}
	})

	return <>
		{/* <Ex2></Ex2> */}
		<div id='scene' style={{height:`${100*sceneLength}dvh`,position:'relative'}} ref={sceneRef}>
			<div id='sceneContent'
				//캔버스 스타일
			>
				{/* 프로그레스바 */}
				<div id='sceneProgress'>
					<div id='sceneProgressBar' style={{width:`${100*barProgress}%`}}>

					</div>
				</div>
				{/* 캔버스 */}
				<div id='canvasWrapper'>
					<BackgroundPanel colorString={'var(--color-backdrop1)'} visible={true}/>
					<BackgroundPanel colorString={'var(--color-backdrop2)'} visible={backgroundColorIndex>=1} direction={-30}/>
					<BackgroundPanel colorString={'var(--color-backdrop3)'} visible={backgroundColorIndex>=2} direction={30}/>
					<Canvas id='canvas'
						ref={canvasRef}
						shadows
						shadow-mapsize-width={1024}
						shadow-mapsize-height={1024}
						camera={{
							fov:23,
							near:0.05,
							far:400,
							zoom:zooms[zoomIndex],
							position:[0,55,73]
						}}
					>
						<Scene progress={sceneProgress} cameraZoom={zooms[zoomIndex]} sectionIndex={sectionIndex} gotoActive={gotoActive}></Scene>
						<Suspense fallback={null}>
							<EffectComposer smaa>
								<Bloom 
									luminanceThreshold={0.0}
									intensity={0.67}
									mipmapBlur
								/>
								{/* <SSAO /> */}
							</EffectComposer>
						</Suspense>
					</Canvas>
				</div>
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
