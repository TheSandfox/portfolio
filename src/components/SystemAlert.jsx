import { useContext, useEffect, useRef, useState } from "react";
import './systemalert.css';
import { AppContext } from "../App";

export default function SystemAlert() {
	const { systemAlert } = useContext(AppContext);
	const alertRef = useRef(null);
	const [display,setDisplay] = useState([null]);
	useEffect(()=>{
		setDisplay(systemAlert);
	},[systemAlert]);
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