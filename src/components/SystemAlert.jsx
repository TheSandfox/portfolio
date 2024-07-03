import { useEffect, useRef, useState } from "react";
import './systemalert.css';

export default function SystemAlert({text}) {
	const alertRef = useRef(null);
	const [display,setDisplay] = useState([null]);
	useEffect(()=>{
		// if (text.length>0) {
			setDisplay(text);
		// }
	},[text]);
	useEffect(()=>{
		if (display[0]===null) {return;}
		if (alertRef.current===null) {return;}
		let element = alertRef.current;
		element.classList.add('active');
		const timer = setTimeout(()=>{
			element.classList.remove('active');
		},2500);

		return ()=>{
			clearTimeout(timer);
		}
	},[display])
	return <>
		<div className="systemAlert fontMain" ref={alertRef}>
			{display===null?null:display[0]}
		</div>
	</>
}