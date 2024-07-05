import './app.css'
import './common.css'
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene'
import { Suspense, createContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
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
import { Html } from '@react-three/drei';
import Detail from './components/Detail';

const sceneLength = 2.0;
const progressOffset = 0.0;
const progressVelocity = 2.25;

export const AppContext = createContext();

function App() {
	//디테일(컨텍스트)
	const [detail,setDetail] = useState(null);
	const handleDetail = {
		set:(val)=>{
			setDetail(val);
		},
		close:()=>{
			setDetail(null);
		}
	}
	//브레이크포인트(컨텍스트)
	const [breakPoint,setBreakPoint] = useState(BreakPoint.get());
	//시스템얼럿(컨텍스트)
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
	const gotoActive = useCallback((force)=>{
		const sceneElement = sceneRef.current;
		if (sceneElement===null) {return;}
		if (window.scrollY>window.innerHeight*(sceneLength/2)||force) {
			window.scrollTo({behavior: 'smooth', top:window.innerHeight*(sceneLength/2), left:0});
		} else {
			window.scrollTo({behavior: 'smooth', top:0, left:0});
		}
	},[])
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
	const carculateProgress = ()=>{
		const sceneElement = sceneRef.current;
		const canvasElement = canvasRef.current;
		const approx = (sceneElement.getBoundingClientRect().top * -1) / (sceneElement.offsetHeight-canvasElement.offsetHeight);
		return Math.max(Math.min(progressOffset+(approx*progressVelocity),1.0),+0.0);
	}
	//씬 프로그레스(컨텍스트)
	const [progress,setProgress] = useState(0.);
	const [barProgress,setBarProgress] = useState(0.);
	const [sectionIndex,setSectionIndex] = useState(carculateSectionIndex());
	//반응형 줌
	const backgroundColorIndex = useMemo(()=>{
		return Keyframes.backgroundColorIndex[sectionIndex].getPoint(progress);
	},[progress,sectionIndex]);
	//스크롤관련 전부
	useEffect(()=>{
		const scrollCallback = ()=>{
			//브레이크포인트
			setBreakPoint(BreakPoint.get());
			//씬 프로그레스
			setProgress(
				carculateProgress()
			);
			//섹션인덱스
			setSectionIndex(
				carculateSectionIndex()
			);
		}
		// const barTimer = setInterval(()=>{
		// 	setBarProgress(THREE.MathUtils.lerp(barProgress,progress,0.1));
		// },5)
		setBarProgress(progress);

		window.addEventListener('scroll',scrollCallback);
		
		return ()=>{
			window.removeEventListener('scroll',scrollCallback);
			// clearInterval(barTimer);
		}
	},[progress,barProgress]);
		
	//리사이즈
	useEffect(()=>{
		const resizeCallback = ()=>{
			setBreakPoint(BreakPoint.get());
		}
		window.addEventListener('resize',resizeCallback);
		
		return ()=>{
			window.removeEventListener('resize',resizeCallback);
		}
	},[]);

	return <><AppContext.Provider
		value={{
			detail,
			handleDetail,
			breakPoint,
			progress,
			sectionIndex,
			systemAlert,
			handleSystemAlert,
			gotoActive
		}}
	>
		{/* <Ex2></Ex2> */}
		<div id='scene' style={{height:`${100*sceneLength}dvh`,position:'relative'}} ref={sceneRef}>
			<div id='sceneContent'
				//캔버스 스타일
			>
				{/* 프로그레스바 */}
				{/* <div id='progress'>
					<div id='progressBar' style={{width:`${100*barProgress}%`,transition:'0.25s ease'}}>

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
							zoom:BreakPoint.zooms[breakPoint],
							position:[0,55,73]
						}}
					>	
						{/* 씬&씬로딩 */}
						<Scene/>
						{/* 블룸프로세서 */}
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
				<Intro/>
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
		<Main id={'main'} outerRef={mainRef}/>
		<div id='outro' ref={outroRef}>
			{/* <Outro/> */}
		</div>
		{/* 목업 */}
		<Detail/>
		{/* 시스템메세지(클립보드 복사 등) */}
		<SystemAlert/>
		{/* 리모컨 */}
		<Remote/>
	</AppContext.Provider></>
}

export default App;
