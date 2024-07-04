import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './intro.css'
import Keyframes from '../datas/keyframes';

export default function Intro({progress,sectionIndex,gotoActive}) {
	const [state,setState] = useState(Keyframes.introState[sectionIndex].getPoint(progress));
	//프로그레스 콜백
	useEffect(()=>{
		setState(Keyframes.introState[sectionIndex].getPoint(progress));
	},[progress,sectionIndex]);

	//jsx config
	const configuration = {
		style:{
			color:state===1?'var(--color-darkest)':'var(--color-white)',
		}
	}

	return <>
		<div className={`intro first${state===0?' active':''}`} {...configuration}>
			<h1 className='fontTitle'>
				FE개발자 전인탁의<br/>
				포트폴리오입니다
			</h1>
			<div className='bottom'>
				<div className='gotoActive' onClick={()=>{gotoActive(true)}}>
					<img className='icon' src={'/portfolio/icons/icon_arrowdown2.png'} alt={'다음으로'}/>
				</div>
			</div>
		</div>
		<div className={`intro second${state===1?' active':''}`} {...configuration}>
			<h1 className='fontTitle'>
				FE개발자 전인탁의<br/>
				포트폴리오입니다
			</h1>
		</div>
		<div className={`intro third${state===2?' active':''}`} {...configuration}>
			<h1 className='fontTitle'>
				FE개발자 전인탁의<br/>
				포트폴리오입니다
			</h1>
		</div>
	</>
}