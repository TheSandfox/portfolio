import './clonepage.css';
import CLONE_PAGE_DATAS from '/src/datas/clonePageDatas';
import { ProjectDetailButton } from './Project';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';

function ClonePageCard({item}) {
	const { handleDetail } = useContext(AppContext);
	const [active,setActive] = useState(false);
	return <>
		<div 
			className={`clonePageCard${active?' active':''}`}
			onMouseEnter={()=>{setActive(true)}}
			onMouseLeave={()=>{setActive(false)}}
		>
			{/*이미지 백드롭*/}
			<img src={item.imgPath} alt={item.title}/>
			{/* 호버시 오버레이 */}
			<div className='overlay'>
				{/*  */}
				<div className='buttons'>
					<ProjectDetailButton 
						item={{
							imgPath:'/portfolio/icons/icon_search.png',
							title:'자세히 보기',
							colorString:'#2E7D32'
						}}
						hideTitle
						onClick={()=>{handleDetail.set({...item});}}
					/>
					<ProjectDetailButton 
						item={{
							imgPath:'/portfolio/icons/icon_link.png',
							title:'사이트 바로가기',
							colorString:'#00A9FF'
						}}
						hideTitle
						to={item.details[1]}
					/>
					<ProjectDetailButton 
						item={{
							imgPath:'/portfolio/icons/icon_github.png',
							title:'Github 바로가기',
							colorString:'#181717'
						}}
						hideTitle
						to={item.details[2]}
					/>
				</div>
			</div>
			{/* 하단 제목 */}
			<div className='bottom'>
				<h4 className='fontMedium'>{item.title}</h4>
				<p className='fontMain'>{item.dateStart} ~ {item.dateEnd}</p>
			</div>
		</div>
	</>
}

export function ClonePages() {
	return <div className="clonePageRows">
		{CLONE_PAGE_DATAS.map((items,index1)=>{
			return <div className='clonePageRow' key={index1}>
				{items.map((item,index2)=>{
					return <ClonePageCard item={item} key={index2}/>
				})}
			</div>
		})}
	</div>	
}