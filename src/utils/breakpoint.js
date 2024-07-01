import * as THREE from 'three';
import { useEffect, useRef, useState } from "react";
import { ConstantCurve } from "./mycurve";

const maxWidth = [
	480,
	640,//2
	960//1
	//++:0
]

const get = ()=>{
	let pixel = window.innerWidth;
	for(let i=0;i<maxWidth.length;i++) {
		if (pixel<=maxWidth[i]) {
			return maxWidth.length-i;
		}
		// console.log('홋');
	}
	return 0;
}

export {
	get
}