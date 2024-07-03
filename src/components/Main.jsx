import './main.css';
import SectionAboutMe from '/src/components/sections/SectionAboutMe';
import SectionSkills from '/src/components/sections/SectionSkills';
import SectionProjects from '/src/components/sections/SectionProjects';
import SectionClonePages from '/src/components/sections/SectionClonePages';
import SectionContactMe from '/src/components/sections/SectionContactMe';
import LeftTab from './lefttab/LeftTab';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

export default function Main({id,outerRef,handleSystemAlert}) {
	const aboutMeRef = useRef(null);
	const skillsRef = useRef(null);
	const projectsRef = useRef(null);
	const clonePagesRef = useRef(null);
	const contactMeRef = useRef(null);
	//레퍼런스들 배열에 담기
	const elements = useMemo(()=>{
		return [
			aboutMeRef.current,
			skillsRef.current,
			projectsRef.current,
			clonePagesRef.current,
			contactMeRef.current
		];
	},[
		aboutMeRef.current,
		skillsRef.current,
		projectsRef.current,
		clonePagesRef.current,
		contactMeRef.current
	]);
	const scrollFunc = useCallback((index)=>{
		elements[index].scrollIntoView({ behavior: "smooth",block: "center" });
	},[elements]);
	
	//섹션인덱스 계산함수
	const carculateSectionIndex = useCallback(()=>{
		let carculatedIndex = 0;
		if (elements[0]===null) {
			return 0;
		}
		if (elements[0].getBoundingClientRect().top>window.innerHeight) {
			return 0;
		}
		//
		elements.forEach((element,index)=>{
			if (element.getBoundingClientRect().top<=0.) {
				carculatedIndex = index;
				// console.log(carculatedIndex);
			}
		});
		//
		return carculatedIndex;
	},[elements]);
	//섹션인덱스 스테이트
	const [sectionIndex,setSectionIndex] = useState(0);
	//엘리먼츠 배열 준비되면 섹션인덱스 초기화
	useEffect(()=>{
		if (carculateSectionIndex&&elements[0]) {
			setSectionIndex(carculateSectionIndex());
		}
	},[elements,carculateSectionIndex])
	//스크롤 이벤트리스너
	useEffect(()=>{
		// console.log(elements);
		const scrollCallback = ()=>{
			if (elements[0]===null) {
				return 0;
			}
			if (elements[0].getBoundingClientRect().top>window.innerHeight) {
				return 0;
			}
			let carculatedIndex = 0;
			elements.forEach((element,index)=>{
				if (element.getBoundingClientRect().top<=0.) {
					carculatedIndex = index;
					// console.log(carculatedIndex);
				}
			});
			setSectionIndex(carculatedIndex);
		}
		window.addEventListener('scroll',scrollCallback);

		return ()=>{
			window.removeEventListener('scroll',scrollCallback);
		}
	},[sectionIndex,elements,carculateSectionIndex]);
	//return jsx
	return <main id={id} ref={outerRef}>
		<div className='left'>
			{/* 좌탭자리 */}
			<LeftTab scrollFunc={scrollFunc} sectionIndex={sectionIndex}/>
		</div>
		<div className='right'>
			{/* 섹션들 자리 */}
			<SectionAboutMe outerRef={aboutMeRef}/>
			<SectionSkills outerRef={skillsRef}/>
			<SectionProjects outerRef={projectsRef}/>
			<SectionClonePages outerRef={clonePagesRef}/>
			<SectionContactMe outerRef={contactMeRef} handleSystemAlert={handleSystemAlert}/>
		</div>
	</main>
}