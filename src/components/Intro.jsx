import { useEffect } from 'react'
import './intro.css'

export default function Intro({title,children,colorString}) {
	useEffect(()=>{

	},[children]);
	return <>
		<div className='intro'>
			<h1 className='fontTitle' style={{color:colorString}}>{title}</h1>
		</div>
	</>
}