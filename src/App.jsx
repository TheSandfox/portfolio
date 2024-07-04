import './app.css'
import './common.css'
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as BreakPoint from './datas/breakpoint';
import BackgroundPanel from './components/BackgroundPanel';
import Keyframes from './datas/keyframes';
import Main from './components/Main';
import SystemAlert from './components/SystemAlert';
import Intro from './components/Intro';
import Remote from './components/Remote';
import Social from './components/Social';

const sceneLength = 2.0;
const progressOffset = 0.0;
const progressVelocity = 2.25;

function App() {
	//시스템얼럿
	const [systemAlert,setSystemAlert] = useState([null]);
	const handleSystemAlert = {
		set:(val)=>{
			console.log(val);
			setSystemAlert([val]);
		}
	}
	//레퍼런스
	const sceneRef = useRef(null);
	const canvasRef = useRef(null);
	const mainRef = useRef(null);
	const outroRef = useRef(null);
	//섹션워프
	const gotoActive = (force)=>{
		const sceneElement = sceneRef.current;
		if (sceneElement===null) {return;}
		if (window.scrollY>window.innerHeight*(sceneLength/2)||force) {
			window.scrollTo({behavior: 'smooth', top:window.innerHeight*(sceneLength/2), left:0});
		} else {
			window.scrollTo({behavior: 'smooth', top:0, left:0});
		}
	}
	//지금어디섹션
	const carculateSectionIndex = ()=>{
		if (outroRef.current===null) {return 0;}
		if (outroRef.current.getBoundingClientRect().top<=window.innerHeight) {
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
			);
			//섹션인덱스
			setSectionIndex(
				carculateSectionIndex()
			);
		}
		// const barTimer = setInterval(()=>{
		// 	setBarProgress(THREE.MathUtils.lerp(barProgress,sceneProgress,0.1));
		// },5)
		setBarProgress(sceneProgress);

		window.addEventListener('scroll',scrollCallback);
		
		return ()=>{
			window.removeEventListener('scroll',scrollCallback);
			// clearInterval(barTimer);
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
				{/* <div id='sceneProgress'>
					<div id='sceneProgressBar' style={{width:`${100*barProgress}%`,transition:'0.25s ease'}}>

					</div>
				</div> */}
				{/* 소셜버튼 */}
				<Social/>
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
							zoom:BreakPoint.zooms[zoomIndex],
							position:[0,55,73]
						}}
					>
						<Scene progress={sceneProgress} cameraZoom={BreakPoint.zooms[zoomIndex]} sectionIndex={sectionIndex} gotoActive={gotoActive}></Scene>
						<Suspense fallback={null}>
							<EffectComposer smaa>
								<Bloom 
									luminanceThreshold={0.0}
									intensity={0.67}
									mipmapBlur
								/>
							</EffectComposer>
						</Suspense>
					</Canvas>
				</div>
				{/* 소개문구 */}
				<Intro 
					progress={sceneProgress}
					sectionIndex={sectionIndex}
					gotoActive={gotoActive}
				>
				</Intro>
				{/* 소셜버튼 */}
			</div>
			{/* 그라디언트&godown */}
			<div id='sceneGradient'>
				<div className='gotoActive' onClick={()=>{
					let element = document.querySelector('#main');
					if (element) {
						element.scrollIntoView({behavior:'smooth'});
					}
				}}>
					<img className='icon' src={'/portfolio/icons/icon_arrowdown2.png'} alt={'다음으로'}/>
				</div>
			</div>
		</div>
		<Main id={'main'} outerRef={mainRef} handleSystemAlert={handleSystemAlert}/>
		<div id='outro' ref={outroRef}>
			{/* <Outro/> */}
		</div>
		{/* 시스템메세지(클립보드 복사 등) */}
		<SystemAlert text={systemAlert}/>
		{/* 리모컨 */}
		<Remote gotoActive={gotoActive}/>
	</>
}

export default App
