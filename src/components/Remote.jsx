import { useCallback, useContext } from "react";
import SimpleButton from "./generic/SimpleButton";
import './remote.css';
import { AppContext } from "../App";

export default function Remote({}) {
	const { gotoActive } = useContext(AppContext);
	const goTop = useCallback(()=>{
		// gotoActive();
		window.scrollTo({behavior:'smooth',top:0,left:0});
	},[]);
	const goMiddle = useCallback(()=>{
		let element = document.querySelector('#main');
		if (element) {
			if (element.getBoundingClientRect().bottom<=window.scrollY) {
				element.scrollIntoView({behavior:'smooth',block:'end'});
			} else {
				element.scrollIntoView({behavior:'smooth'});
			}
		}
	},[]);
	const goBottom = useCallback(()=>{
		let element = document.querySelector('#outro');
		if (element) {
			element.scrollIntoView({behavior:'smooth'});
		}
	},[]);
	return <>
		<div id="remote">
			{/* 위로 */}
			<SimpleButton 
				onClick={goTop} 
				title={'맨 위로'} 
				colorString={'#2196F3'}
				imgPath={'/portfolio/icons/icon_arrowup.png'}
				className={'hoverInverse'}
			/>
			{/* 중앙으로 */}
			<SimpleButton 
				onClick={goMiddle}
				title={'메인'} 
				colorString={'#2196F3'}
				imgPath={'/portfolio/icons/icon_menu.png'}
				className={'hoverInverse'}
			/>
			{/* 아래로 */}
			<SimpleButton 
				onClick={goBottom} 
				title={'맨 아래로'} 
				colorString={'#2196F3'}
				imgPath={'/portfolio/icons/icon_arrowdown.png'}
				className={'hoverInverse'}
			/>
			
		</div>
	</>
}