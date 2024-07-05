import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import './intro.css'
import Keyframes from '../datas/keyframes';
import { AppContext } from '../App';

export default function Intro({}) {
	const { gotoActive, sectionIndex, progress } = useContext(AppContext);
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
			{/* 안녕하세요 */}
			<div className='content'>
				<p className='fontMedium'>
					안녕하세요,
				</p>
				<h1 className='fontTitle'>
					프론트엔드 개발자<br/>
					전인탁입니다!
				</h1>
			</div>
			{/* 내려가기버튼 */}
			<div className='bottom'>
				<div className='gotoActive' onClick={()=>{gotoActive(true)}}>
					<img className='icon' src={'/portfolio/icons/icon_arrowdown2.png'} alt={'다음으로'}/>
				</div>
			</div>
		</div>
		<div className={`intro second${state===1?' active':''}`} {...configuration}>
			{/* 중간문구 */}
			<div className='content'>
				<img className='icon denkyu' src='/portfolio/icons/icon_idea.png' alt=''/>
				<h1 className='fontSubTitle'>
					좋아하는 키워드는<br/>
					새로배움, 번뜩임 입니다.<br/>
					<br/>
					배움을 게을리하지 않는<br/>
					청정수 개발자가 되겠습니다!
				</h1>
			</div>
		</div>
		<div className={`intro third${state===2?' active':''}`} {...configuration}>
			{/* 안녕히가세요 */}
			<div className='content'>
				<h1 className='fontTitle'>
					끝까지 봐주셔서<br/>
					감사합니다:)
				</h1>
			</div>
		</div>
	</>
}