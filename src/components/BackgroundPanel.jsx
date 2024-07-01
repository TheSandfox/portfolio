import { useEffect, useRef } from "react";
import './backgroundpanel.css';

export default function BackgroundPanel({colorString,visible,direction}) {
	const ref = useRef(null);
	useEffect(()=>{
		let element = ref.current;
		if (visible) {
			element.classList.add('active');
		} else {
			element.classList.remove('active');
		}
	},[visible]);	
	return <>
		<div 
			ref={ref} 
			className={`backgroundPanelWrapper`} 
			style={{transform:`rotate(${direction}deg) scale(2.0)`}}
		>
			<div className="backgroundPanel" style={{backgroundColor:colorString}}></div>
		</div>
	</>
}