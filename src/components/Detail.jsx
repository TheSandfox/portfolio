import { AppContext } from '../App';
import './detail.css';
import { useContext, useEffect, useMemo } from "react"
import SimpleButton from './generic/SimpleButton';
import { ProjectDetailButton } from './generic/Project';

export default function Detail() {
	const { detail, handleDetail } = useContext(AppContext);
	const visible = useMemo(()=>{
		let body = document.body;
		if(detail===null) {
			//바디 잠금 해제
			body.classList.remove('lock');
			return false
		} else {
			//바디 잠금
			body.classList.add('lock');
			return true
		}
	},[detail]);
	useEffect(()=>{
		const escapeCallback = (e)=>{
			// console.log(e.key);
			if (visible&&e.key==='Escape') {
				handleDetail.set(null);
			}
		}
		window.addEventListener('keyup',escapeCallback);

		return ()=>{
			window.removeEventListener('keyup',escapeCallback);
		}
	},[visible,handleDetail]);
	return <>{
		visible
		?<div id="detail" className='fontMain'>
			<div id="detailContents">
				{/* 상단 컬러오버레이 */}
				<div className='top'>
					{/* 백드롭 */}
					<div className='backdrop' style={{
						backgroundColor:detail.colorString||'#000'
					}}>
					</div>
					{/* 제목 */}
					<h2 className='fontSubTitle'>
						{detail.title}
					</h2>
					{/* 썸네일 */}
					{detail.imgPath
						?<div className='imgContainer'>
							<img className={'thumbnailBlur'} src={detail.imgPath} alt={'썸네일'}/>
							<img className={'thumbnail'} src={detail.imgPath} alt={'썸네일'}/>
						</div>
						:<></>
					}
					{/* 디테일버튼 */}
					<div className='projectDetails'>
						<ProjectDetailButton 
							item={{
								imgPath:'/portfolio/icons/icon_link.png',
								colorString:'#00A9FF'
							}}
							hideTitle
							to={detail.details[1]}
						/>
						<ProjectDetailButton 
							item={{
								imgPath:'/portfolio/icons/icon_github.png',
								colorString:'#181717'
							}}
							hideTitle
							to={detail.details[2]}
						/>
					</div>
				</div>
				{/* 바텀 내용 */}
				<div className='bottom'>
					{/* 간략설명 */}
					<p className='fontMain description'>
						{detail.description}
					</p>
					{/* 상세설명 */}
					<></>
				</div>
			</div>
			<SimpleButton 
				title={'닫기'}
				imgPath={'/portfolio/icons/icon_close.png'}
				colorString={'#F05032'}
				onClick={()=>{
					handleDetail.set(null);
				}}
				className={'buttonClose'}
			/>
		</div>
		:<></>
	}</>
}